import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ModalComponent } from './modal.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
  ]
})
export class ModalModule { }
