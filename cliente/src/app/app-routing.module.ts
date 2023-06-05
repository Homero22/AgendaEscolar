import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Layouts} from './layout/layout';
import config from 'config/config';
import { HomeModule } from './pages/home/home.module';
import { ResgistroModule } from './pages/resgistro/resgistro.module';
import { RecuperarModule } from './pages/recuperar/recuperar.module';
//localhost:4200
const routes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
