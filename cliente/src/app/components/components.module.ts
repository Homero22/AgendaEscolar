import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenciasComponent } from './conferencias/conferencias.component';



@NgModule({
  declarations: [
    ConferenciasComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ConferenciasComponent
  ]
})
export class ComponentsModule { }
