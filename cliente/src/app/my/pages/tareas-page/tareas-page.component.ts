import { Component } from '@angular/core';
@Component({
  selector: 'app-tareas-page',
  templateUrl: './tareas-page.component.html',
  styleUrls: [
    './tareas-page.component.css'
  ]
})
export class TareasPageComponent {
  panelOpenState = false;

  openModal(titulo: string){
    console.log("Modal");
  }

}
