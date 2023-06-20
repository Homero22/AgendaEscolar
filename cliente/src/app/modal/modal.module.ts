import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';
import { EditarHorarioComponent } from '../components/ajustes-horario/editar-horario/editar-horario.component';



@NgModule({
  declarations: [
    ModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
