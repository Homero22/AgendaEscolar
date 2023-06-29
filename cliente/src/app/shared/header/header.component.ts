import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthInterceptor } from 'src/app/core/security/auth.interceptor';
import { MateriaService } from 'src/app/core/services/materia.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  constructor(
    private router: Router,
    private srvMaterias: MateriaService
    ) { }

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


}
