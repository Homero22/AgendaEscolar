import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-apunte',
  templateUrl: './mostrar-apunte.component.html',
  styleUrls: ['./mostrar-apunte.component.css']
})
export class MostrarApunteComponent implements OnInit {

  idApunte!: number;
  viewApunte!: number;

  titleApunte!: string;
  private destroy$ = new Subject<any>();

  existContentSimilar: boolean = false;

  contRelac: boolean = false;

  constructor(
    public srvApunte: ApunteService,
    public srvContenido: ContenidoService,
    public srvModal: ModalService,
    public dialog: MatDialog,
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
        this.viewApunte = 2;
        Swal.close();
      }
    });
  }

  //Funcion para regresar a la lista de apuntes
  returnListApunte(){
    this.viewApunte = 1;
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
          //Seleccionamos solo aquellos contenidos que tengan el idUser diferente al idUser del apunte
          resContent.body = resContent.body.filter((content:any)=>{
            return content.idUser != this.srvApunte.apunteData.idUser;
          });
          console.log("Valor de resContent =>",resContent);
          this.srvContenido.contentSimilarData = resContent.body;
          this.existContentSimilar = true;
        }else{
          console.log("No existe contenido similar");
        }
      }
    });
  }

  openModelContent(nombreModal: string, idContenido: number, contentTitle: string){
    this.srvModal.setTitleModal(nombreModal);
    this.srvContenido.setIdContenido(idContenido);
    this.srvContenido.setTitle(contentTitle);
    this.dialog.open(ModalComponent, {
      width: 'auto',
      height: 'auto'
    })
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
