import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasRoutingModule } from './materias-routing.module';
import { LayoutMateriasPageComponent } from './page/layout-materias-page/layout-materias-page.component';
import { MateriasPageComponent } from './page/materias-page/materias-page.component';


@NgModule({
  declarations: [
    LayoutMateriasPageComponent,
    MateriasPageComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule
  ]
})
export class MateriasModule { }
