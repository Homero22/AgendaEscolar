import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { TareaService } from 'src/app/core/services/tarea.service';

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
      width: '40%',
      height: 'auto'
    });
  }

  getTareasEstado(estado: number){
    this.srvTarea.getTareasEstado(this.idUser,estado)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(tareaData)=>{
        if(tareaData.body){
          this.srvTarea.tareasPendientes = tareaData.body;
          console.log("Valor de tareasPendientes =>",this.srvTarea.tareasPendientes);
        }else{
          console.log("No hay datos");
        }
      }
    });
  }

  getTareas() {
    this.srvTarea.getTareasUsuario(this.idUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (tareaData) => {
          if (tareaData.body) {
            this.srvTarea.tareas = tareaData.body;
            console.log("Valor de tareas =>", this.srvTarea.tareas);
            this.srvTarea.tareasRealizadas = this.filterTareasFinalizadas();
  
          } else {
            console.log("No hay datos");
          }
        }
      });
  }
  
  filterTareasFinalizadas() {
    return this.srvTarea.tareas.filter((tarea: any) => tarea.tareaEstado === 'FINALIZADA');
  }
  
  

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }



}
