import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { MateriaPageComponent } from './pages/materia-page/materia-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { ApuntesPageComponent } from './pages/apuntes-page/apuntes-page.component';
import { AjustesPageComponent } from './pages/ajustes-page/ajustes-page.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutPageComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomePageComponent,
        loadChildren: () => import('./pages/welcome-page/welcome-page.component').then(m => m.WelcomePageComponent),
      },
      {
        path: 'schedule',
        component: HorarioPageComponent,
      },
      {
        path: 'signatures',
        component: MateriaPageComponent,
      },
      {
        path: 'homeworks',
        component: TareasPageComponent,
      },
      {
        path: 'notes',
        component: ApuntesPageComponent
      },
      {
        path: 'settings',
        component: AjustesPageComponent
      },
      {
        path: '**',
        redirectTo: 'welcome'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
