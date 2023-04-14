import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [


    BodyComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    BodyComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MenuComponent
  ]
})
export class SharedModule { }
