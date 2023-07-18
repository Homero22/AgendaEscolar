import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-contenidos',
  templateUrl: './mostrar-contenidos.component.html',
  styleUrls: ['./mostrar-contenidos.component.css']
})
export class MostrarContenidosComponent implements OnInit{

  private destroy$ = new Subject<any>();

  viewApunte!: number;
  idUser!: any;
  isData!: boolean;
  idApunte!: number;

  constructor(
    public srvApunte: ApunteService,
    public srvContenido: ContenidoService
  ) { }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");

    this.srvApunte.selectIdApunte$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_idApunte)=>{
        this.idApunte = _idApunte;
        console.log("Valor de idApunte =>",this.idApunte);
      }
    })


    console.log("Valor de idUser =>",this.idUser);
    this.isData = false;
    this.getContenidos();
  }

  //Funcion para regresar a la vista de apuntes
  returnListApunte(){
    this.viewApunte = 1;
    this.srvApunte.setApunteView(this.viewApunte);
  }

  //Funcion para mostrar los contenidos guardados
  getContenidos(){
    const idUser = this.idUser;

    Swal.fire({
      title: 'Cargando Contenidos',
      text: 'Espere un momento por favor...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: ()=>{
        Swal.showLoading();
      }
    })

    this.srvContenido.getContenidosGuardados(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContenidos)=>{
        if(resContenidos.status){
          Swal.close();
          console.log("Valor de resContenidos =>",resContenidos);
          this.srvContenido.contentSimilarData = resContenidos.body;
          this.isData = true;
        }else{
          Swal.close();
        }
      },
      error: (err)=>{
        Swal.fire({
          title: 'Error al cargar los contenidos',
          text: 'Por favor intente de nuevo',
          icon: 'error',
          allowOutsideClick: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
      },
      complete: ()=>{
        console.log("Peticion completa");
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
