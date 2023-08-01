import { Component, Input, ChangeDetectorRef } from '@angular/core';
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
    public srvHorario: HorarioService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  horarioConFinDeSemana = false;

  getDiasDeHorario(): string[] {
    // console.log("HORARIO CON FDS? ",this.horarioConFinDeSemana);
    if (this.horarioConFinDeSemana) {
      console.log("HORARIO CON FDS? en if ",this.horarioConFinDeSemana);
      return ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
    } else {
      console.log("HORARIO CON FDS? en else ",this.horarioConFinDeSemana);
      return ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
    }
  }

  actualizarHorario() {
  this.srvHorario.dias = this.getDiasDeHorario();
  this.changeDetectorRef.detectChanges();
  }
}
