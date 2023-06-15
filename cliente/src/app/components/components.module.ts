import { NgModule } from '@angular/core';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { HorarioComponent } from './horario/horario.component';
import { MateriaComponent } from './Materia/materia.component';
import { TareasComponent } from './tareas/tareas.component';
import { ScheduleModule, RecurrenceEditorModule, WeekService, AgendaService, DayService, MonthAgendaService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from './button/button.component';
@NgModule({
  declarations: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent,
    ButtonComponent
  ],
  imports: [
    ScheduleModule, RecurrenceEditorModule
  ],
  exports: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent,
    ButtonComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
})
export class ComponentsModule { }
