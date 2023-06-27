import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    console.log("cerrar sesion");
    localStorage.removeItem('token');
    //ruta de redireccionamiento auth/ingreso
    this.router.navigate(['auth/ingreso']);

  }

  sendBool(){
    this.srvMaterias.setBool(false);
  }


}
