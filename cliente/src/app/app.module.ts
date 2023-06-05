import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AdminModule } from './pages/admin/admin.module';
import { HomeModule } from './pages/home/home.module';
import { ConfiguracionModule } from './pages/configuracion/configuracion.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    AdminModule,
    HomeModule,
    ComponentsModule,
    AdminModule,
    ConfiguracionModule,
    FormsModule,
    ModalModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
