import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenciasComponent } from './conferencias/conferencias.component';
import { FormularioComponent } from './formulario/formulario.component';



@NgModule({
  declarations: [
    ConferenciasComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ConferenciasComponent,
    // FormularioComponent
    
  ]
})
export class ComponentsModule { }
