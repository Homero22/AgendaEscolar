import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjustesRoutingModule } from './ajustes-routing.module';
import { LayoutAjustesPageComponent } from './page/layout-ajustes-page/layout-ajustes-page.component';
import { AjustesPageComponent } from './page/ajustes-page/ajustes-page.component';
import { FullLayoutComponent } from 'src/app/layout/full-layout/full-layout.component';
import { LayoutModule } from 'src/app/layout/layout.module';


@NgModule({
  declarations: [
    LayoutAjustesPageComponent,
    AjustesPageComponent
  ],
  imports: [
    CommonModule,
    AjustesRoutingModule,
  ]
})
export class AjustesModule { }
