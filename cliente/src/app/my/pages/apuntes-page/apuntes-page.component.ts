import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MateriaService } from 'src/app/core/services/materia.service';
import { ModalService } from 'src/app/core/services/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apuntes-page',
  templateUrl: './apuntes-page.component.html',
  styleUrls: ['./apuntes-page.component.css']
})
export class ApuntesPageComponent implements OnInit {

  //Variables
  title!: string;
  idUser!: any;

  //Destroy
  private destroy$ = new Subject<any>();

  //Constructor
  constructor(
    private srvModal: ModalService,
    public srvMateria: MateriaService

  ) { }


  //ngOnInit
  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    this.getMaterias();
  }

  //Funcion para abrir el modal
  openModal(title: string) {}

  //Funcion para obtener las materias del usuario Logeado
  getMaterias(){
    Swal.fire({
      // Definimos el titulo y el tamano de la letra ebn 12px
      title: 'Cargando Información de apuntes...',
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

  //ngOnDestroy
  ngOnDestroy(): void {

  }
}
