import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutHorarioPageComponent } from './page/layout-horario-page/layout-horario-page.component';
//localhost:4200/horario/
const routes: Routes = [
  {
    path: '',
    component: LayoutHorarioPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }
