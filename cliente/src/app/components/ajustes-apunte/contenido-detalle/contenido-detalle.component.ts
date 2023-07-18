import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ApunteService } from 'src/app/core/services/apunte.service';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-contenido-detalle',
  templateUrl: './contenido-detalle.component.html',
  styleUrls: ['./contenido-detalle.component.css']
})
export class ContenidoDetalleComponent implements OnInit {

  idContenido!: number;
  idUser!: number;

  private destroy$ = new Subject<any>();

  constructor(
    public srvApuntes: ApunteService,
    public srvContenido: ContenidoService,
    public srvUsuarios: UsuarioService
  ) { }

  ngOnInit(): void {

    this.srvApuntes.selectIdContenido$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(_idContenido)=>{
        this.idContenido = _idContenido;
        console.log("Valor de idContenido En ContenidoDetalle =>",this.idContenido);
      }
    });

    this.getContent();

  }

  //Metodo para obtener la informacion del contenido

  getContent(){
    const idApunte = this.idContenido;
    this.srvContenido.getContent(idApunte)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContent)=>{
        console.log("Valor de resContent =>",resContent);
        this.srvContenido.contentData = resContent.body;
        this.idUser = resContent.body.idUser;
        console.log("Valor de idUser =>",this.idUser);
        this.getUserInfo();
      }
    });
  }

  // Metodo para obtener la informacion del usuario
  getUserInfo(){

    this.srvUsuarios.getUserByID( this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resUser)=>{
        console.log("Valor de resUser =>",resUser);
        this.srvUsuarios.userData = resUser.body;
      }
    });
  }




  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
