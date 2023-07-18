import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';

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

  constructor(
    public srvApunte: ApunteService,
    public srvContenido: ContenidoService
  ) { }

  ngOnInit(): void {
    this.idUser = sessionStorage.getItem("id");
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

    this.srvContenido.getContenidosGuardados(idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContenidos)=>{
        console.log("Contenidos =>",resContenidos);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
