import { NgModule} from '@angular/core';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { HorarioComponent } from './horario/horario.component';
import { TareasComponent } from './tareas/tareas.component';
import { ScheduleModule, RecurrenceEditorModule, WeekService, AgendaService, DayService, MonthAgendaService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { AgregarMateriaComponent } from './ajustes-materia/agregar-materia/agregar-materia.component';
import { EditarMateriaComponent } from './ajustes-materia/editar-materia/editar-materia.component';
import { EditarHorarioComponent } from './ajustes-horario/editar-horario/editar-horario.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ApuntesComponent,
    HorarioComponent,
    TareasComponent,
    ButtonComponent,
    AgregarMateriaComponent,
    EditarMateriaComponent,
    EditarHorarioComponent
  ],
  imports: [
    ScheduleModule,
    RecurrenceEditorModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ApuntesComponent,
    HorarioComponent,
    TareasComponent,
    ButtonComponent,
    AgregarMateriaComponent,
    EditarMateriaComponent,
    EditarHorarioComponent,
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
})
export class ComponentsModule { }
