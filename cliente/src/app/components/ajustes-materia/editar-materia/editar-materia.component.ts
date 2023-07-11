import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MateriaService } from 'src/app/core/services/materia.service';
import { modMateriaModel } from 'src/app/core/models/materia';
import { ModalService } from 'src/app/core/services/modal.service';
@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent {

  private destroy$ = new Subject<any>();

  //creamos el formulario myForm
  myForm!: FormGroup;

  idMateria!: number;
  idUser!: any;

  constructor(
    private fb: FormBuilder,
    private srvMateria: MateriaService,
    private srvModal: ModalService
  ) {
    this.myForm = this.fb.group({
      idUser: [
        '',
      ],
      nombre: [
        '',
        [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
      ],
      materiaAcro: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{3}$/)
        ]
      ],
      materiaColor: [
        '',
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


    this.completeForm();
  }


  completeForm(){
    console.log("Valor recibido de ID Proveedor =>", this.srvMateria.selectIdMateria$);

    this.srvMateria.selectIdMateria$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (idMateria: number)=>{
        Swal.fire({
          title: 'Cargando',
          didOpen: () => {
            Swal.showLoading()
          },
        });
        this.idMateria = idMateria;
        this.getMateriaID();
      },
      error: (err: any)=>{
        console.log("Error al obtener el ID de la materia =>", err);
      },
      complete: ()=>{
        console.log("Petición completa!");
        Swal.close();
      }
    })
  }

  getMateriaID(){
    this.srvMateria.getMateria(this.idMateria)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (materiaData: modMateriaModel)=>{
        Swal.fire({
          title: 'Cargando',
          didOpen: () => {
            Swal.showLoading()
          },
        });
        this.myForm = this.fb.group({
          idUser: [
            materiaData.body.idUser,
          ],
          nombre: [
            materiaData.body.nombre,
            [Validators.required, Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")]
          ],
          materiaAcro: [
            materiaData.body.materiaAcro,
            [
              Validators.required,
              Validators.pattern(/^[A-Z]{3}$/)
            ]
          ],
          materiaColor: [
            materiaData.body.materiaColor,
            [ Validators.pattern(/^#[0-9A-F]{6}$/i)]
          ],
          profesorNombre: [
            materiaData.body.profesorNombre,
            [Validators.required,
            Validators.pattern("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\\s]*$")
            ]
          ],
        });
      },
      error: (err: any)=>{
        console.log("Error al obtener la materia =>", err);
      },
      complete: ()=>{
        console.log("Petición completa!");
        Swal.close();
      }
    });
  }

  //codigo para la peleta de colores
  selectedColor: string = '#000000';

  getColor(event: any) {
    this.selectedColor = event.target.value;
    console.log(this.selectedColor);
    const color = this.selectedColor;
    this.myForm.get('materiaColor')?.setValue(color);
    console.log(this.myForm.value);
  }

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


  saveMateria(){
    console.log("Valor que llega al Form de Materia =>",this.myForm.value);

    this.myForm.get('idUser')?.setValue(this.idUser);

    const sendMateriaData = this.myForm.value;

    Swal.fire({
      title:'Esta seguro de modificar esta Materia?',
      showDenyButton:true,
      confirmButtonText:'Aceptar',
      denyButtonText:'Cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvMateria.putMateria(this.idMateria, sendMateriaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data)=>{
            if(data.status){
              Swal.fire({
                title:'Materia modificada con éxito!',
                icon:'success',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Materia modificada con éxito =>",data);
              setTimeout(() => {
                this.getMaterias()
              }, 1000);
            }else{
              Swal.fire({
                title:'Error al modificar Materia!',
                icon:'error',
                showConfirmButton: false,
                timer: 1500
              })
              console.log("Error al modificar materia =>", data);
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
            console.log("Error al agregar proveedor =>", error);
          },
          complete: ()=>{
            console.log("Petición completa!");
            this.myForm.reset();
            this.srvModal.setCloseMatDialog(true);
            this.getMaterias();
          }
        })
      }
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
