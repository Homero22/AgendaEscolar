import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { TareasComponent } from './tareas/tareas.component';
import { HorarioComponent } from './horario/horario.component';
import { RegistroComponent } from './registro/registro.component';
import { MateriaComponent } from './Materia/materia.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ApuntesComponent,
    TareasComponent,
    HorarioComponent,
    RegistroComponent,
    MateriaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ApuntesComponent,
    TareasComponent,
    HorarioComponent,
    RegistroComponent,
    MateriaComponent

  ]
})
export class ComponentsModule { }
