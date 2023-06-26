import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutPageComponent } from './pages/full-layout-page/full-layout-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { HorarioPageComponent } from './pages/horario-page/horario-page.component';
import { MateriaPageComponent } from './pages/materia-page/materia-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { ApuntesPageComponent } from './pages/apuntes-page/apuntes-page.component';
import { AjustesPageComponent } from './pages/ajustes-page/ajustes-page.component';
import { ApuntePagesComponent } from './pages/materia-page/page/apunte-pages/apunte-pages.component';

// localhost:4200/me/''
const routes: Routes = [
  {
    path: '',
    component: FullLayoutPageComponent,
    children: [
      {
        path: 'welcome',
        component: WelcomePageComponent,
      },
      {
        path: 'schedule',
        component: HorarioPageComponent,
      },
      {
        path: 'signatures',
        component: MateriaPageComponent,
        // loadChildren: () => import('./pages/materia-page/materia-page.module').then(m => m.MateriaPageModule),
        children: [
          {
            path: 'notes',
            component: ApuntePagesComponent,
          }
        ]
      },
      {
        path: 'homeworks',
        component: TareasPageComponent,
      },
      {
        path: 'settings',
        component: AjustesPageComponent
      },
      {
        path: '**',
        redirectTo: 'welcome',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRoutingModule { }
