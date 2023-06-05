import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { LayoutTareasPageComponent } from './page/layout-tareas-page/layout-tareas-page.component';
import { TareasPageComponent } from './page/tareas-page/tareas-page.component';


@NgModule({
  declarations: [
    LayoutTareasPageComponent,
    TareasPageComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule
  ]
})
export class TareasModule { }
