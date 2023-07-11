import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-apunte',
  templateUrl: './mostrar-apunte.component.html',
  styleUrls: ['./mostrar-apunte.component.css']
})
export class MostrarApunteComponent implements OnInit {

  idApunte!: number;
  viewApunte!: boolean;

  titleApunte!: string;
  private destroy$ = new Subject<any>();

  contRelac: boolean = false;

  constructor(
    public srvApunte: ApunteService,
    public srvContenido: ContenidoService
  ) { }

  ngOnInit(): void {
    this.srvApunte.selectIdApunte$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_idApunte)=>{
        this.idApunte = _idApunte;
        console.log("Valor de idApunte En MostrarApunte =>",this.idApunte);
      }
    });
    this.getApunte();
    this.getContentSimilar();
  }

  //Funcion para mostrar el apunte
  getApunte(){
    Swal.fire({
      title: 'Cargando...',
      didOpen:()=>{
        Swal.showLoading();
      }
    });

    this.srvApunte.getApunteIndividual(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resApunte)=>{
        this.srvApunte.apunteData = resApunte.body;
        console.log("Valor de apunteData =>",this.srvApunte.apunteData);
        this.viewApunte = true;
        Swal.close();
      }
    });
  }

  //Funcion para regresar a la lista de apuntes
  returnListApunte(){
    this.viewApunte = false;
    this.srvApunte.setApunteView(this.viewApunte);
  }

  getContentSimilar(){
    this.srvContenido.getContenidosSimilares(this.idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContent)=>{
        console.log("Valor de resContent =>",resContent);
        if(resContent.status){
          this.contRelac = true;
          console.log("Valor de resContent =>",resContent);
          this.srvContenido.contentSimilarData = resContent.body;
        }else{
          console.log("Error al obtener contenido similar");
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
