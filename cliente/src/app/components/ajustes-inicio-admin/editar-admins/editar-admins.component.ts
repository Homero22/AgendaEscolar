import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editar-admins',
  templateUrl: './editar-admins.component.html',
  styleUrls: ['./editar-admins.component.css']
})
export class EditarAdminsComponent {
   @Input() idAdmin!: number;

  constructor(

  ) {
    console.log("idAdmin =>",this.idAdmin);
   }



}
