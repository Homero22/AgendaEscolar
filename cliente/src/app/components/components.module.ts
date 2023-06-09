import { NgModule } from '@angular/core';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { HorarioComponent } from './horario/horario.component';
import { MateriaComponent } from './Materia/materia.component';
import { TareasComponent } from './tareas/tareas.component';

@NgModule({
  declarations: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent
  ],
  imports: [
  ],
  exports: [
    ApuntesComponent,
    HorarioComponent,
    MateriaComponent,
    TareasComponent

  ]
})
export class ComponentsModule { }
