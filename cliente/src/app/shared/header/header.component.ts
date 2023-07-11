import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
// import { AuthInterceptor } from 'src/app/core/security/auth.interceptor';
import { MateriaService } from 'src/app/core/services/materia.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUser!: any;
  userName!: any;


  private destroy$ = new Subject<any>();

  constructor(
    private router: Router,
    private srvMaterias: MateriaService,
    public srvUsuario: UsuarioService
    ) { this.permisos }

  permiso: boolean = true

  ngOnInit(): void {

    this.idUser = sessionStorage.getItem("id");
    this.userName = sessionStorage.getItem("nombre");
    console.log("id => ", this.idUser)
    console.log("nombre => ", this.userName)
    this.permisos();
    this.getUserByID();
  }


  permisos(){
    const rol =  sessionStorage.getItem('rol');
    console.log("rol => ", rol)
    if(rol == 'USUARIO'){
      this.permiso = false;
      // this.permiso = true;
      console.log ("tiene permiso ? ",this.permiso)
    }
    // this.rol = parseInt(this.idUser);
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    sessionStorage.clear();

    //ruta de redireccionamiento auth/ingreso
    this.router.navigate(['auth/ingreso']);
    // this.authInterceptor;
  }

  sendBool(){
    this.srvMaterias.setBool(false);
  }

  //Función para obtener la información del usuario
  getUserByID(){
    this.srvUsuario.getUserByID(this.idUser)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (dataUser) => {
        this.srvUsuario.usuarioData = dataUser;
        console.log("data => ", dataUser)
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        console.log("complete");
      }
    })
  }

  ngonDestroy(){
    this.sendBool();
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
