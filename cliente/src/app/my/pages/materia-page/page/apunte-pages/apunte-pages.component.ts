import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apunte-pages',
  templateUrl: './apunte-pages.component.html',
  styleUrls: ['./apunte-pages.component.css']
})
export class ApuntePagesComponent {

  //Variables
  title!: string;
  idUser!: any;
  idMateria!: number;
  viewApunte!: number;

  //Destroy
  private destroy$ = new Subject<any>();

  //Constructor
  constructor(
    private srvModal: ModalService,
    public srvApuntes: ApunteService,
    public dialog: MatDialog,
    public srvMateria: MateriaService

  ) { }


  //ngOnInit
  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    this.srvMateria.selectIdMateria$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_idMateria)=>{
        this.idMateria = _idMateria;
        console.log("Valor de idMateria =>",this.idMateria);
      }
    });
    this.getApuntes();
    this.getMateria();

    this.viewApunte = 1;

    this.srvApuntes.selectApunteView$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_viewApunte)=>{
        this.viewApunte = _viewApunte;
        console.log("Valor de viewApunte =>",this.viewApunte);
      }
    });
  }

  //Funcion para abrir el modal
  openModal(title: string, id:number) {
    this.srvMateria.setIdMateria(id);
    this.srvModal.setTitleModal(title);
    this.dialog.open(ModalComponent,{
      width: 'auto',
      height: 'auto'
    });
  }

  // Función para abir el editar del modal
  openModalEdit(title: string, id: number) {
    this.srvApuntes.setIdApunte(id);
    this.srvModal.setTitleModal(title);
    this.dialog.open(ModalComponent,{
      width: 'auto',
      height: 'auto'
    });
  }

  contenidoModal(title: string, id: number){
    this.srvApuntes.setIdApunte(id);
    this.srvModal.setTitleModal(title);
    this.dialog.open(ModalComponent,{
      width: 'auto',
      height: 'auto'
    });
  }

  getApuntes(){
    Swal.fire({
      title: 'Cargando Apuntes...',
      allowOutsideClick: false,
      didOpen:()=>{
        Swal.showLoading();
      }
    });

    this.srvApuntes.getApuntesUsuario(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(apunteData )=>{
        Swal.close();
        if(apunteData.body){
          this.srvApuntes.datosApuntes = apunteData.body;
          console.log("Valor de apunteData.body =>",this.srvApuntes.datosApuntes);
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

  deleteApunte(id: number){
    Swal.fire({
      title: '¿Estas seguro de eliminar este Apunte?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result)=>{
      if(result.isConfirmed){
        this.srvApuntes.deleteApunte(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(apunteData)=>{
            if(apunteData.status){
              Swal.fire({
                icon: 'success',
                title: 'Apunte Eliminado',
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo eliminar el apunte!',
                showConfirmButton: false,
                timer: 1500
              });
            }
          },
          error:(err)=>{
            console.log("Error en la peticion =>",err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Revisa no tener contenido generado en este apunte!',
              showConfirmButton: true,
            })
          },
          complete:()=>{
            console.log("Peticion finalizada");
            this.getApuntes();
          }
        });
      }
    });
  }

  // Funcion para obtener las materias del usuario Logeado
  getMateria(){
    this.srvMateria.getMateria(this.idMateria)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(materiaData)=>{
        if(materiaData.body){
          this.srvMateria.materia = materiaData.body;
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

  // Funcion para abrir el apunte seleccionado
  openApunte(idApunte: number){
    console.log("Valor de idApunte =>",idApunte);
    this.srvApuntes.setIdApunte(idApunte);
    this.viewApunte = 2;
  }

  //Funcion para abrir los contenidos guardados
  openContenidos(idApunte: number){
    this.viewApunte = 3;
    this.srvApuntes.setIdApunte(idApunte);
    console.log("Valor de viewApunte en openContenidos =>",this.viewApunte);
  }

  //funcion para regresar al /me/signatures
  return(){
    this.srvMateria.setIdMateria(0);
    this.srvMateria.setBool(false);
  }

  //ngOnDestroy
  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
