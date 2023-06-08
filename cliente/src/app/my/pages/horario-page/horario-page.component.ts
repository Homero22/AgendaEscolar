import { Component } from '@angular/core';

@Component({
  selector: 'app-horario-page',
  templateUrl: './horario-page.component.html',
styleUrls: ['./horario-page.component.css']
})
  export class HorarioPageComponent {

    ngOnInit(): void {
    }


    assignFunction(day: string, hour: string) {
      console.log(`Asignar función para ${day} a las ${hour}`);
    }

}
