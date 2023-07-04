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
   }


   ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("idAdmin =>",this.idAdmin);
   }

}
