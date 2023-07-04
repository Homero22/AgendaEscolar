import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from 'src/app/core/services/materia.service';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css']
})
export class AgregarMateriaComponent implements OnInit {
  @ViewChild('inputColor') inputColor!: string;

  private destroy$ = new Subject<any>();

  //creamos el formulario myForm
  myForm!: FormGroup;
  close!: boolean;

 idUser: any;

  constructor(
    private fb: FormBuilder,
    private srvMateria: MateriaService,
    private srvModal: ModalService
  ) {
    //inicializamos el formulario
    this.myForm = this.fb.group({
      idUser: [
        this.idUser,
      ],
      nombre: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")],
      ],
      materiaAcro: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{3}$/)
        ]
      ],
      materiaColor: [
        '#000000',
       [ Validators.pattern(/^#[0-9A-F]{6}$/i)]
      ],
      profesorNombre: [
        '',
        [Validators.required,
        Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
        ]
      ],
    });
  }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    console.log("idUser =>",this.idUser);
    //declaramos el valor de idUser en el formulario
    this.myForm.get('idUser')?.setValue(this.idUser);
    console.log("myForm =>",this.myForm.value);
  }


  //codigo para la peleta de colores
  selectedColor: string = '#000000';

  getColor(event: any) {
    this.selectedColor = event.target.value;
    console.log(this.selectedColor);
    this.myForm.get('materiaColor')?.setValue(this.selectedColor);
  }

  // Funcion para guardar la materia
  saveMateria(){
    //colocamos el valor del color en el formulario
    this.myForm.get('materiaColor')?.setValue(this.selectedColor);
    //colocamos el valor del idUser en el formulario
    this.myForm.get('idUser')?.setValue(this.idUser);
    console.log("Valor que llega al Form de Materia =>",this.myForm.value);

    const sendMateriaData = this.myForm.value;

    Swal.fire({
      title:'Esta seguro de añadir esta Materia?',
      showDenyButton:true,
      confirmButtonText:'Agregar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvMateria.postMateria(sendMateriaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data)=>{
            console.log("Data que llega al agregar Materia =>",data);
            if(data.status){
              Swal.fire({
                title:'Materia agregada con éxito!',
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Materia agregada con éxito =>",data);
              this.getMaterias()
              setTimeout(() => {
                this.getMaterias()
              }, 1000);
            }else{
              Swal.fire({
                title:data.message,
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Error al agregar materia =>", data.message);
            }
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
          error: (error)=>{
            Swal.fire({
              title:'Error al agregar Materia!',
              icon:'error',
              showConfirmButton: false,
              timer: 1500
            })
            console.log("Error al agregar materia =>", error);
          },
          complete: ()=>{
            console.log("Petición completa!");
            //cerramos el modal mandando el valor de true al behaviorSubject
            // this.srvModal.setCloseMatDialog(true);
            this.myForm.reset();
            this.getMaterias();
          }
        })
      }
    })
  }

  // funcion para obtener las materias del usuario
  getMaterias(){
    Swal.fire({
      title: 'Cargando Materias...',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.srvMateria.getMateriasUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        Swal.close();
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
