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

  viewNotes: boolean = false;

  // Variables
  titleModal: string = '';
  idMateria!: number;
  idUser!: any;
  destroy$ = new Subject<any>();
  existInfo: boolean = false;
  materiaMessage: string = '';

  materiaExist: boolean = false;

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
      this.srvMateria.selectBool$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(bool)=>{
          this.viewNotes = bool;
          console.log("Valor de bool =>",bool);
          this.getMaterias();
        }
      });
      //reiniciamos el valor del viewNotes
      this.srvMateria.setBool(false);
    }

    // Función para abrir el editar del modal
    openModalEdit(title:string, id: number){
      console.log("openModalEdit");
      this.srvMateria.setIdMateria(id);
      this.srvModal.setTitleModal(title);
      this.dialog.open(ModalComponent,{
        width: '600px',
        height: 'auto'
      });
    }

    // Función para abrir el modal de crear
    openModal(title: string){
      this.srvModal.setTitleModal(title);
        console.log("openModal");
        this.dialog.open(ModalComponent,{
          width: '600px',
          height: 'auto'
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
              if(materiaData.status === true){

                Swal.fire({
                  title: 'Materia eliminada',
                  text: materiaData.message,
                  icon: 'success',
                  showConfirmButton:false,
                  timer:2500
                })
                console.log("Valor de materiaData =>",materiaData);
              }else{
                Swal.fire({
                  title: 'Error al eliminar la materia',
                  text: materiaData.message,
                  icon: 'error',
                  showConfirmButton:false,
                  timer:2500
                })
                console.log("Valor de materiaData =>",materiaData);
              }
              setTimeout(() => {
                this.getMaterias();
              }
              , 2500);
            },
            error:(err)=>{
              console.log("Error en la peticion =>",err);
            },
            complete:()=>{
              console.log("Peticion finalizada");
              window.location.reload();
            }
          });
        }
      });
    }

  //Función para obtener las materias del usuario Logeado
  getMaterias() {
    Swal.fire({
      title: 'Cargando Materias...',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.srvMateria.getMateriasUsuario(this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (materiaData) => {
          Swal.close();
          if (materiaData.status) {
            this.srvMateria.datosMateria = materiaData.body;
            console.log("Valor de materiaData.body =>", this.srvMateria.datosMateria);
            this.existInfo = materiaData.status;
            this.existInfo = true;
          } else {
            console.log("No existen materias");
          }
        },
        error: (err) => {
          console.log("Error en la peticion Materias =>", err);
          Swal.fire({
            title: 'Error al obtener las materias',
            text: err,
            icon: 'error',
            showConfirmButton: false,
            timer: 2500
          })
        },
        complete: () => {
          console.log("Peticion finalizada");
        }
      });
  }

    sendIdMateria(id:number){
      console.log("sendIdMateria");
      this.viewNotes = true;
      console.log("Valor de viewNotes =>",this.viewNotes);
      this.srvMateria.setIdMateria(id);
      console.log("Valor de id =>",id);
    }

    // ngOnDestroy
    ngOnDestroy(): void {
      console.log("ngOnDestroy");
      this.destroy$.next({});
      this.destroy$.complete();
    }
}


