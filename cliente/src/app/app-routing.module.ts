import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/pages/error404/error404.component';
//localhost:4200/....
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then(m => m.AjustesModule),
  },
  {
    path: 'apuntes',
    loadChildren: () => import('./pages/apuntes/apuntes.module').then(m => m.ApuntesModule),
  },
  {
    path:'horario',
    loadChildren: () => import('./pages/horario/horario.module').then(m => m.HorarioModule),
  },
  {
    path: 'materias',
    loadChildren: () => import('./pages/materias/materias.module').then(m => m.MateriasModule),
  },
  {
    path: 'tareas',
    loadChildren: () => import('./pages/tareas/tareas.module').then(m => m.TareasModule),
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
  },
  {
    path: '404',
    component: Error404Component,
  },
  {
    path: '',
    redirectTo: 'welcome',
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
