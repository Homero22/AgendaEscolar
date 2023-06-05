import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoverPageComponent } from './pages/recover-page/recover-page.component';
import { LayoutModule } from '../layout/layout.module';
import { SimpleLayoutComponent } from '../layout/simple-layout/simple-layout.component';


@NgModule({
  declarations: [
    LayoutPagesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RecoverPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
  exports:[
    LayoutPagesComponent,
    LoginPageComponent,
    RegisterPageComponent,
    RecoverPageComponent
  ]
})
export class AuthModule { }
