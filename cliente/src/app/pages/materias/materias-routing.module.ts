import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutMateriasPageComponent } from './page/layout-materias-page/layout-materias-page.component';
//localhost:4200/materias/
const routes: Routes = [
  {
    path: '',
    component: LayoutMateriasPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MateriasRoutingModule { }
