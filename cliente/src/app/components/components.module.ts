import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaComponent } from './materia/materia.component';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { TareasComponent } from './tareas/tareas.component';
import { HorarioComponent } from './horario/horario.component';
import { RegistroComponent } from './registro/registro.component';



@NgModule({
  declarations: [
    MateriaComponent,
    ApuntesComponent,
    TareasComponent,
    HorarioComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: []
})
export class ComponentsModule { }
