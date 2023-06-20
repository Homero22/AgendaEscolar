import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { MateriaService } from 'src/app/core/services/materia.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { ModalComponent } from 'src/app/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apuntes-page',
  templateUrl: './apuntes-page.component.html',
  styleUrls: ['./apuntes-page.component.css']
})
export class ApuntesPageComponent implements OnInit {

  displayedColumns: string[] = ['#', 'Titulo Apunte', 'Materia', 'Acciones'];

  //Variables
  title!: string;
  idUser!: any;

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
    this.getApuntes();
  }

  //Funcion para abrir el modal
  openModal(title: string) {
    this.srvModal.setTitleModal(title);
    this.dialog.open(ModalComponent,{
      width: '500px',
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
            if(apunteData.body){
              Swal.fire(
                'Eliminado',
                'El apunte se elimino correctamente',
                'success'
              );
              this.getMaterias();
            }else{
              Swal.fire(
                'Error',
                'El apunte no se pudo eliminar',
                'error'
              );
            }
          },
          error:(err)=>{
            console.log("Error en la peticion =>",err);
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
  getMaterias(){
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

  //ngOnDestroy
  ngOnDestroy(): void {

  }
}
