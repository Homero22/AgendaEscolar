import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRoutingModule } from './my-routing.module';
import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
import { MateriaPageComponent } from './pages/materia-page/materia-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { ApuntesPageComponent } from './pages/apuntes-page/apuntes-page.component';
import { AjustesPageComponent } from './pages/ajustes-page/ajustes-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    ApuntesPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent
  ],
  imports: [
    CommonModule,
    MyRoutingModule,
    SharedModule,
    ComponentsModule,
    FullCalendarModule
  ],
  exports: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    ApuntesPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent
  ]
})
export class MyModule { }
