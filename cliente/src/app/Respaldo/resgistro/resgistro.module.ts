import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResgistroComponent } from './resgistro.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ResgistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    ResgistroComponent
  ]
})
export class ResgistroModule { }
