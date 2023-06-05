import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { LayoutWelcomePageComponent } from './page/layout-welcome-page/layout-welcome-page.component';
import { WelcomePageComponent } from './page/welcome-page/welcome-page.component';


@NgModule({
  declarations: [
    LayoutWelcomePageComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
