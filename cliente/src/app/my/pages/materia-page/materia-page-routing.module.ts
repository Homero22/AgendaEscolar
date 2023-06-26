import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriaPageComponent } from './materia-page.component';
import { ApuntesPageComponent } from '../apuntes-page/apuntes-page.component';
import { ApuntePageLayoutComponent } from './page/apunte-page-layout/apunte-page-layout.component';
import { ApuntePagesComponent } from './page/apunte-pages/apunte-pages.component';

// localhost:4200/me/signatures/''
const routes: Routes = [
  {
    path: '',
    component: ApuntePagesComponent,
    children: [
      {
        path: 'notes',
        component: ApuntesPageComponent,
      },
      {
        path: 'signatures',
        component: MateriaPageComponent,
      },
      {
        path: '',
        component: MateriaPageComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        component: MateriaPageComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriaPageRoutingModule { }
