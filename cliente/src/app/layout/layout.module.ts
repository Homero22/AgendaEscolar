import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { SharedModule } from '../shared/shared.module';
import { AjustesRoutingModule } from '../pages/ajustes/ajustes-routing.module';
import { TareasRoutingModule } from '../pages/tareas/tareas-routing.module';
import { AuthRoutingModule } from '../auth/auth-routing.module';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AjustesRoutingModule,
    AuthRoutingModule
  ],
  exports:[
    FullLayoutComponent,
    SimpleLayoutComponent,
    ]
})

export class LayoutModule {
}
