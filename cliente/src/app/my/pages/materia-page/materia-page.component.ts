import { Component } from '@angular/core';
import { MateriaService } from 'src/app/core/services/materia.service';
import { Subject, takeUntil } from 'rxjs';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-materia-page',
  templateUrl: './materia-page.component.html',
  styleUrls: [
    './materia-page.component.css'
  ]

})
export class MateriaPageComponent {


  // Variables
  titleModal: string = '';
  idMateria!: number;
  idUser!: any;
  destroy$ = new Subject<any>();

  // Constructor
    constructor(
      public srvMateria: MateriaService,
      private dialog: MatDialog,
      private srvModal: ModalService
    ) {

    }

    // ngOnInit
    ngOnInit(): void {
      this.idUser = sessionStorage.getItem("id");
      this.getMaterias();
    }


    //Función para obtener las materias del usuario Logeado
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


    // Función para abrir el editar del modal
    openModalEdit(title:string, id: number){
      console.log("openModalEdit");
      this.srvMateria.setIdMateria(id);
      this.srvModal.setTitleModal(title);
      this.dialog.open(ModalComponent,{
        width: '50%',
        height: '56%'
      });
    }

    // Función para abrir el modal de crear
    openModal(title: string){
      this.srvModal.setTitleModal(title);
        console.log("openModal");
        this.dialog.open(ModalComponent,{
          width: '50%',
          height: '56%'
        });
    }

    // Función para eliminar una materia
    deleteMateria(id:number){
      Swal.fire({
        title: '¿Estas seguro de eliminar esta materia?',
        text: "No podras revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then((result)=>{
        if(result.isConfirmed){
          this.srvMateria.deleteMateria(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next:(materiaData)=>{
              if(materiaData.body){
                Swal.fire(
                  'Eliminado',
                  'La materia se elimino correctamente',
                  'success'
                );
                this.getMaterias();
              }else{
                Swal.fire(
                  'Error',
                  'La materia no se pudo eliminar',
                  'error'
                );
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
      });
    }

    // ngOnDestroy
    ngOnDestroy(): void {
      console.log("ngOnDestroy");
      this.destroy$.next({});
      this.destroy$.complete();
    }
}


