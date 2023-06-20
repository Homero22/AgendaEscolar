import { Component, Input } from '@angular/core';
import { HorarioService } from 'src/app/core/services/horario.service';

@Component({
  selector: 'app-configurar-horario',
  templateUrl: './configurar-horario.component.html',
  styleUrls: ['./configurar-horario.component.css'],

})
export class ConfigurarHorarioComponent {
  @Input() content!: string;
  @Input() left!: number;
  @Input() top!: number;
  @Input() display!: boolean;

  constructor(
    public srvHorario: HorarioService
  ) { 
    // this.content = '';
    // this.left = 0;
    // this.top = 0;
    // this.display = false;
    
  }
  horarioConFinDeSemana = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.content);
  }

  getDiasDeHorario(): string[] {
    if (this.horarioConFinDeSemana) {
      return ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
    } else {
      return ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
    }
  }
  
  actualizarHorario() {

  this.srvHorario.dias = this.getDiasDeHorario();

  
  }
}
