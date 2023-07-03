import { Component } from '@angular/core';

@Component({
  selector: 'app-mostrar-admins',
  templateUrl: './mostrar-admins.component.html',
  styleUrls: ['./mostrar-admins.component.css']
})
export class MostrarAdminsComponent {

  openModal(){
    console.log("abrir modal")
  }
}
