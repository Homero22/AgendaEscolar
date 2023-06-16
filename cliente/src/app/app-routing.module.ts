import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';
import { DenegadoComponent } from './shared/pages/denegado/denegado.component';
import { loguinSecurityGuard } from './core/guards/loguin-security.guard';
//localhost:4200/....
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'me',
    // canActivate: [loguinSecurityGuard],
    loadChildren: () => import('./my/my.module').then(m => m.MyModule),
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: 'denegado',
    component: DenegadoComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
