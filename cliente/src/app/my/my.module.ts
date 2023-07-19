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
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ReportesPageComponent } from './pages/reportes-page/reportes-page.component';
import { InicioAdminComponent } from '../components/inicio-admin/inicio-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent,
    ReportesPageComponent,
    // InicioAdminComponent,
  ],
  imports: [
    CommonModule,
    MyRoutingModule,
    SharedModule,
    ComponentsModule,
    MaterialModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
    // InicioAdminComponent,
  ],
  exports: [
    FullLayoutPageComponent,
    MateriaPageComponent,
    TareasPageComponent,
    AjustesPageComponent,
    WelcomePageComponent,
    HorarioPageComponent,

  ]
})
export class MyModule { }
