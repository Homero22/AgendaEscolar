import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApuntesRoutingModule } from './apuntes-routing.module';
import { LayoutApuntesPageComponent } from './page/layout-apuntes-page/layout-apuntes-page.component';
import { ApuntesPageComponent } from './page/apuntes-page/apuntes-page.component';


@NgModule({
  declarations: [
    LayoutApuntesPageComponent,
    ApuntesPageComponent
  ],
  imports: [
    CommonModule,
    ApuntesRoutingModule
  ]
})
export class ApuntesModule { }
