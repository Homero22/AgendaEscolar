import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
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

  data = [
    { id: 1, apunte: 'Apunte 1', materia: 'Materia 1', acciones: 'Acciones 1' },
    { id: 2, apunte: 'Apunte 2', materia: 'Materia 2', acciones: 'Acciones 2' },
    { id: 3, apunte: 'Apunte 3', materia: 'Materia 3', acciones: 'Acciones 3' }
    // Agrega más elementos al array según sea necesario
  ];

  //Variables
  title!: string;
  idUser!: any;

  //Destroy
  private destroy$ = new Subject<any>();

  //Constructor
  constructor(
    private srvModal: ModalService,
    public srvMateria: MateriaService,
    public dialog: MatDialog

  ) { }


  //ngOnInit
  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
    this.getMaterias();
  }

  //Funcion para abrir el modal
  openModal(title: string) {
    this.srvModal.setTitleModal(title);
    this.dialog.open(ModalComponent,{
      width: '500px',
      height: 'auto'
    });
  }

  getApuntes(){}

  //Funcion para obtener las materias del usuario Logeado
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
