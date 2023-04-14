import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './pages/admin/admin.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from './pages/home/home.module';
import { ConfiguracionModule } from './pages/configuracion/configuracion.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    AdminModule,
    HomeModule,
    AdminModule,
    ConfiguracionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
