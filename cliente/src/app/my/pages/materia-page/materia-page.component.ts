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

 titleModal: string = '';

 idMateria!: number;

 idUser!: any;


  //LOGICA DE LA PAGINA
  nombre ="APRENDIENDO HTML- CSS- TS";
  nombres: string[] = ['CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN y algo mas java c xd ciencias ','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN','CIENCIAS', 'MATEMATICAS', 'FUNDAMENTOS DE PROGRAMACIÓN'];


  //SERVICIOS
  destroy$ = new Subject<any>();
    constructor(
      public srvMateria: MateriaService,
      private dialog: MatDialog,
      private srvModal: ModalService
    ) {

    }



    ngOnInit(): void {
      console.log("ngOnInit");
      this.idUser = sessionStorage.getItem("id");

      this.getMaterias();
    }

    getMaterias(){

      Swal.fire({
        title: 'Cargando Materias...',
        didOpen: () => {
          Swal.showLoading()
        }
      });

      // this.srvMateria.getMaterias()
      // .pipe(takeUntil(this.destroy$))
      // .subscribe({
      //   next:(materiaData)=>{
      //     Swal.close();
      //     if(materiaData.body){
      //       this.srvMateria.datosMateria = materiaData.body;
      //       console.log("Valor de materiaData.body =>",this.srvMateria.datosMateria);
      //     }else{
      //       console.log("No hay datos");
      //     }
      //   },
      //   error:(err)=>{
      //     console.log("Error en la peticion =>",err);
      //   },
      //   complete:()=>{
      //     console.log("Peticion finalizada");
      //   }
      // });

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

    openModalEdit(title:string, id: number){
      console.log("openModalEdit");
      this.srvMateria.setIdMateria(id);
      this.srvModal.setTitleModal(title);
      this.dialog.open(ModalComponent,{
        width: '60%',
        height: '70%'
      });
    }

    openModal(title: string){

      // Implemenetamos el  servicio de modal para obtener el title
      this.srvModal.setTitleModal(title);
        console.log("openModal");
        this.dialog.open(ModalComponent,{
          width: '60%',
          height: '70%'
        });
    }




    ngOnDestroy(): void {
      console.log("ngOnDestroy");
      this.destroy$.next({});
      this.destroy$.complete();
    }
}


