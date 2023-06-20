import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ScheduleModule, RecurrenceEditorModule,  } from '@syncfusion/ej2-angular-schedule';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { ModalComponent } from './modal/modal.component';
import { ModalModule } from './modal/modal.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    ScheduleModule,
    RecurrenceEditorModule,
    MatSlideToggleModule,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
