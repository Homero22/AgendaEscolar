import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
// import { AuthInterceptor } from 'src/app/core/security/auth.interceptor';
import { MateriaService } from 'src/app/core/services/materia.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private destroy$ = new Subject<any>();

  constructor(
    private router: Router,
    private srvMaterias: MateriaService
    ) { this.permisos }
  
  permiso: boolean = true

  ngOnInit(): void {
    this.permisos();
  }


  permisos(){
    const rol =  sessionStorage.getItem('rol');
    console.log("rol => ", rol)
    if(rol == 'USUARIO'){
      this.permiso = false;
      console.log ("tiene permiso ? ",this.permiso)
    }
    // this.rol = parseInt(this.idUser);
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    //ruta de redireccionamiento auth/ingreso
    this.router.navigate(['auth/ingreso']);
    // this.authInterceptor;
  }

  sendBool(){
    this.srvMaterias.setBool(false);
  }

  ngonDestroy(){
    this.sendBool();
    this.destroy$.next({});
    this.destroy$.complete();
  }

}
