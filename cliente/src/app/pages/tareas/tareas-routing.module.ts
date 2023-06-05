import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTareasPageComponent } from './page/layout-tareas-page/layout-tareas-page.component';
import { FullLayoutComponent } from 'src/app/layout/full-layout/full-layout.component';
//localhost:4200/tareas/
const routes: Routes = [
  {
    path: '',
    component: LayoutTareasPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
