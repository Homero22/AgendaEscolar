import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { DenegadoComponent } from './pages/denegado/denegado.component';


@NgModule({
  declarations: [
    BodyComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Error404Component,
    DenegadoComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    RouterModule.forChild([]),
    MatSlideToggleModule,
  ],
  exports: [
    BodyComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Error404Component,
    DenegadoComponent,
  ]
})
export class SharedModule { }
