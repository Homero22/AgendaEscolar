import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriaPageRoutingModule } from './materia-page-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { ApuntePagesComponent } from './page/apunte-pages/apunte-pages.component';
import { MostrarApunteComponent } from './page/mostrar-apunte/mostrar-apunte.component';


@NgModule({
  declarations: [
    ApuntePagesComponent,
    MostrarApunteComponent
  ],
  imports: [
    CommonModule,
    MateriaPageRoutingModule,
    MaterialModule,

  ],
  exports: [
    RouterModule,
    ApuntePagesComponent
  ]
})
export class MateriaPageModule { }
