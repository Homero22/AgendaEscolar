import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutApuntesPageComponent } from './page/layout-apuntes-page/layout-apuntes-page.component';
//localhost:4200/apuntes/
const routes: Routes = [
  {
    path: '',
    component: LayoutApuntesPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApuntesRoutingModule { }
