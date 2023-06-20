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
    MatSlideToggleModule
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
    AgregarTareaComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService],
})
export class ComponentsModule { }
