import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { TareaService } from 'src/app/core/services/tarea.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tareas-page',
  templateUrl: './tareas-page.component.html',
  styleUrls: [
    './tareas-page.component.css'
  ]
})
export class TareasPageComponent {
  panelOpenState = false;
  idUser : any;
  constructor(
    private srvModal: ModalService,
    private dialog: MatDialog,
    public srvTarea: TareaService
  ) { }

  private destroy$ = new Subject<any>();

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem('id');
    this.idUser = parseInt(this.idUser);
    this.getTareasEstado(1);  //obtener tareas pendientes
    this.getTareas(); //obtener todas las tareas de un usuario
  }

  openModal(){
    console.log("Modal");
    this.srvModal.setTitleModal("Agregar Tarea");
    this.dialog.open(ModalComponent,{
      width: '60%',
      height: 'auto'
    });
  }

  getTareasEstado(estado: number){
    this.srvTarea.getTareasEstado(this.idUser,estado)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        console.log("tareaData =>",tareaData);
        if(tareaData.body){
          this.srvTarea.tareasPendientes = tareaData.body;
          console.log("Valor de tareasPendientes =>",this.srvTarea.tareasPendientes);
        }else{
          console.log("No hay datos");
        }
      },
      error:(err)=>{
        console.log("Error =>",err);
      }
    });
  }

  getTareas() {
    this.srvTarea.getTareasUsuario(this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tareaData) => {
          console.log("tareaData =>", tareaData);
          if (tareaData.body) {
            this.srvTarea.tareas = tareaData.body;
            console.log("Valor de tareas =>", this.srvTarea.tareas);
            this.srvTarea.tareasRealizadas = this.filterTareasFinalizadas();
          } else {
            console.log("No hay datos");
          }
        },error:(err)=>{
          console.log("Error =>",err);
        }
      });
  }

  filterTareasFinalizadas() {
    return this.srvTarea.tareas.filter((tarea: any) => tarea.tareaEstado === 'FINALIZADA');
  }

  editarTarea(idTarea: number){
    console.log("Editar Tarea");
    this.srvTarea.setIdTarea(idTarea);
    this.srvModal.setTitleModal("Editar Tarea");
    this.dialog.open(ModalComponent,{
      width: '60%',
      height: 'auto'
    });
  }

  cambiarEsado(idTarea: number, tarea: any){
    console.log("Cambiar Estado", idTarea);
    console.log("Tarea como me llega a la función =>",tarea);
    let op: number;
    if(tarea == "PENDIENTE"){
      tarea = "FINALIZADA";
      op = 0;
    }else{
      tarea= "PENDIENTE";
      op = 1;
    }
    console.log("Tarea antes de enviar a homero=>",tarea, op);
    this.srvTarea.putTareaEstado(idTarea,op, tarea)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        Swal.fire({
          title: tareaData.message ,
          icon:'success',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("tareaData =>",tareaData);
        this.getTareasEstado(1);
        this.getTareas();
      }
    });
  }

  deleteTarea(idTarea: number){
    console.log("Eliminar Tarea", idTarea);
    this.srvTarea.deleteTarea(idTarea)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        Swal.fire({
          title:'Tarea Eliminada con éxito!',
          icon:'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.getTareasEstado(1);
        this.getTareas();
      }

    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }



}
