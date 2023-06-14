import { NgModule } from '@angular/core';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { HorarioComponent } from './horario/horario.component';
import { MateriaComponent } from './Materia/materia.component';
import { TareasComponent } from './tareas/tareas.component';
import { ScheduleModule, RecurrenceEditorModule, WeekService, AgendaService, DayService, MonthAgendaService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
@NgModule({
  declarations: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent
  ],
  imports: [
    ScheduleModule, RecurrenceEditorModule
  ],
  exports: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
})
export class ComponentsModule { }
