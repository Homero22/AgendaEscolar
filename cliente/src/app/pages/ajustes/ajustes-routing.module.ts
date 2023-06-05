import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAjustesPageComponent } from './page/layout-ajustes-page/layout-ajustes-page.component';
import { FullLayoutComponent } from 'src/app/layout/full-layout/full-layout.component';
//localhost:4200/ajustes/
const routes: Routes = [
  {
    path: '',
    component: LayoutAjustesPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjustesRoutingModule { }
