import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-agregar-apunte',
  templateUrl: './agregar-apunte.component.html',
  styleUrls: ['./agregar-apunte.component.css']
})
export class AgregarApunteComponent implements OnInit {

  private destroy$ = new Subject<any>();

  myForm!: FormGroup;
  close!: boolean;
  idUser: any;
  currentDate!: string;
  value_string_time: any;


  constructor(
    private fb: FormBuilder,
    private srvApuntes: ApunteService,
    private srvModal: ModalService,
    public srvMateria: MateriaService
  ) {
    this.myForm = this.fb.group({
      id:[
        0,
      ],
      idUser: [
        this.idUser,
      ],
      idMateria:[
        ''
      ],
      apunteTitulo: [
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
      apunteTexto:[
        '',
        [
          Validators.required,
          Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
      apunteRecordatorio:[
        '',
        [
          Validators.required,
        ]

      ],
      fechaCreacion:[
        '',

      ]
    })
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    console.log("idUser =>",this.idUser)
    this.myForm.get('idUser')?.setValue(this.idUser);
    console.log("Valor del idUser de mhyForm", this.myForm.get('idUser')?.value);
    this.currentDate = new Date().toISOString().slice(0, 10);
    console.log("valor de currentDate =>", this.currentDate);
    this.getMaterias();
  }

  // Función para agregar el Apunte
  saveApunte(){
    //imprimimos en consola el valor de myform
    this.myForm.get('fechaCreacion')?.setValue(this.currentDate);
    console.log("Valor de MyForm =>", this.myForm.value);

    this.transformDate(this.myForm.get('fechaCreacion')?.value);


    console.log("Valor de MyForm =>", this.myForm.value);

    Swal.fire({
      title:'Esta seguro de añadir este Apunte?',
      showDenyButton:true,
      confirmButtonText:'Agregar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvApuntes.postApunte(this.myForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(apunteData)=>{
            console.log("Valor de apunteData =>",apunteData);
            if(apunteData.status){
              Swal.fire({
                icon:'success',
                title:'Apunte agregado correctamente',
                showConfirmButton:false,
                timer:1500
              });
              console.log("Apunte agregado correctamente =>",apunteData);
            }else{
              Swal.fire({
                icon:'error',
                title:apunteData.message,
                showConfirmButton:false,
                timer:1500
              });
              console.log("Error al agregar el apunte =>",apunteData);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error:(err)=>{
            Swal.fire({
              title:'Error al agregar Apunte!',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })
            console.log("Error al agregar materia =>", err);
          },
          complete:()=>{
            console.log("Peticion finalizada");
            this.srvModal.setCloseMatDialog(true);
            this.myForm.reset();
          }
        });
      }
    });

  }

  transformDate(dateFin: Date){
    const datePipe = new DatePipe('en-US');
    const fechaFormateada = datePipe.transform(dateFin, 'yyyy-MM-dd');
    this.myForm.get('fechaFin')?.setValue(fechaFormateada);
    console.log(fechaFormateada); // Resultado: "2023/06/25"
  }

  // Funcion para obtener las materias del usuario
  getMaterias(){
    this.srvMateria.getMateriasUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        if(materiaData.body){
          this.srvMateria.datosMateria = materiaData.body;
          console.log("Valor de materiaData.body =>",this.srvMateria.datosMateria);
        }else{
          console.log("No hay datos");
        }
      },
      error:(err)=>{
        console.log("Error en la peticion =>",err);
      },
      complete:()=>{
        console.log("Peticion finalizada");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
