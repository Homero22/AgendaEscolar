import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutWelcomePageComponent } from './page/layout-welcome-page/layout-welcome-page.component';
import { FullLayoutComponent } from 'src/app/layout/full-layout/full-layout.component';
//localhost:4200/welcome/
const routes: Routes = [
  {
    path: '',
    component: LayoutWelcomePageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
