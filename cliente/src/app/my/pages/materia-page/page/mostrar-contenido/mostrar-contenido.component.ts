import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ContenidoService } from 'src/app/core/services/contenido.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mostrar-contenido',
  templateUrl: './mostrar-contenido.component.html',
  styleUrls: ['./mostrar-contenido.component.css']
})
export class MostrarContenidoComponent {

  idContenido!: number;
  titleContenido!: string;
  idUsuario!: number;
  nombreUsuario!: string;

  private destroy$ = new Subject<any>();

  constructor(
    public srvContenido: ContenidoService,
    public srvUser: UsuarioService
  ) { }

  ngOnInit(): void {

    this.srvContenido.selectIdContenido$
    .pipe(takeUntil(this.destroy$))
    .subscribe((idContenido: number) => {
      this.idContenido = idContenido;
      console.log("ID del contenido que se quiere visualizar =>",this.idContenido);
    });

    this.srvContenido.selectTitle$
    .pipe(takeUntil(this.destroy$))
    .subscribe((title: string) => {
      console.log("Titulo del contenido que se quiere visualizar =>",title);
      this.titleContenido = title;
    });

    this.getContenido();

  }

  // Función para obtener el contenido
  getContenido(){

    Swal.fire({
      title: 'Cargando',
      text: 'Por favor espere...',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    })


    this.srvContenido.getContent(this.idContenido)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resContent:any) => {
        Swal.close();
        console.log("Respuesta del contenido =>",resContent);
        this.srvContenido.contentData = resContent.body;
        this.idUsuario = resContent.body.idUser;
        this.getUserInfo();
      },
      error: (err:any) => {
        Swal.close();
        console.log("Error al obtener el contenido =>",err);
      },
      complete: () => {
        console.log("Completado");
      }
    })
  }

  // Función para obtener la información del usuario
  getUserInfo(){

    this.srvUser.getUserByID(this.idUsuario)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (resUser:any) => {
        console.log("Respuesta del usuario =>",resUser);
        this.srvUser.userData = resUser.body;
        this.nombreUsuario = resUser.body.nombre + " " + resUser.body.apellido;

      }
    })

  }

  //Funcion para regresar a la pagina anterior
  goBack(){
    this.srvContenido.setViewContenido(0);
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
