import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApuntesComponent } from './apuntes/apuntes.component';
import { TareasComponent } from './tareas/tareas.component';
import { HorarioComponent } from './horario/horario.component';
import { RegistroComponent } from './registro/registro.component';
import { MateriaComponent } from './Materia/materia.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


import {ErrorStateMatcher} from '@angular/material/core';

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
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule

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
