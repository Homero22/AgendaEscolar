import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

import { MyRoutingModule } from './my-routing.module';
import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
import { MateriaPageComponent } from './pages/materia-page/materia-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { AjustesPageComponent } from './pages/ajustes-page/ajustes-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../material/material.module';
import { ApuntesPageComponent } from './pages/apuntes-page/apuntes-page.component';


@NgModule({
  declarations: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent,
    ApuntesPageComponent
  ],
  imports: [
    CommonModule,
    MyRoutingModule,
    SharedModule,
    ComponentsModule,
    MaterialModule,
    MatExpansionModule
  ],
  exports: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent,
    ApuntesPageComponent
  ]
})
export class MyModule { }
