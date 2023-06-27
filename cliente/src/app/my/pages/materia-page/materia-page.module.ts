import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriaPageRoutingModule } from './materia-page-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { ApuntesPageComponent } from '../apuntes-page/apuntes-page.component';
import { ApuntePagesComponent } from './page/apunte-pages/apunte-pages.component';


@NgModule({
  declarations: [
    ApuntePagesComponent
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
