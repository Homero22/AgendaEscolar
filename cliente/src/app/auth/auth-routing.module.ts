import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPagesComponent } from './pages/layout-pages/layout-pages.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RecoverPageComponent } from './pages/recover-page/recover-page.component';
//localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: LayoutPagesComponent,
    children: [
      {
        path: 'ingreso',
        component: LoginPageComponent
      },
      {
        path: 'registro',
        component: RegisterPageComponent,
      },
      {
        path: 'recuperar',
        component: RecoverPageComponent,
      },
      {
        path: '**',
        redirectTo: 'ingreso'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
