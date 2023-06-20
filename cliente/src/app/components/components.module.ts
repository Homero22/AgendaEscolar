import { NgModule} from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { HorarioComponent } from './horario/horario.component';
import { TareasComponent } from './tareas/tareas.component';
import { ScheduleModule, RecurrenceEditorModule, WeekService, AgendaService, DayService, MonthAgendaService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { ButtonComponent } from './button/button.component';
import { CommonModule } from '@angular/common';
import { AgregarMateriaComponent } from './ajustes-materia/agregar-materia/agregar-materia.component';
import { EditarMateriaComponent } from './ajustes-materia/editar-materia/editar-materia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarHorarioComponent } from './ajustes-horario/editar-horario/editar-horario.component';
import { ConfigurarHorarioComponent } from './ajustes-horario/configurar-horario/configurar-horario.component';
import { MaterialModule } from '../material/material.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AgregarTareaComponent } from './ajustes-tareas/agregar-tarea/agregar-tarea.component';
import { EditarTareaComponent } from './ajustes-tareas/editar-tarea/editar-tarea.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
// import {matTimepickerModule} from 'mat-timepicker';
// import { MatInputModule } from '@angular/material/input';
// import { MatTimepickerModule } from '@angular/material/timepicker';

@NgModule({
  declarations: [
    ApuntesComponent,
    HorarioComponent,
    TareasComponent,
    ButtonComponent,
    AgregarMateriaComponent,
    EditarMateriaComponent,
    EditarHorarioComponent,
    ConfigurarHorarioComponent,
    AgregarTareaComponent,
    EditarTareaComponent

  ],
  imports: [
    ScheduleModule,
    RecurrenceEditorModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    // MatTimepickerModule,

    // BrowserModule
  ],
  exports: [
    ApuntesComponent,
    HorarioComponent,
    TareasComponent,
    ButtonComponent,
    AgregarMateriaComponent,
    EditarMateriaComponent,
    EditarHorarioComponent,
    AgregarTareaComponent,
    EditarTareaComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, DatePipe],
})
export class ComponentsModule { }
