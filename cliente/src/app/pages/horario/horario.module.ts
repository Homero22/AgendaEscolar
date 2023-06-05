import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';
import { LayoutHorarioPageComponent } from './page/layout-horario-page/layout-horario-page.component';
import { HorarioPageComponent } from './page/horario-page/horario-page.component';


@NgModule({
  declarations: [
    LayoutHorarioPageComponent,
    HorarioPageComponent
  ],
  imports: [
    CommonModule,
    HorarioRoutingModule
  ]
})
export class HorarioModule { }
