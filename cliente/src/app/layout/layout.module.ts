import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';


@NgModule({
  declarations: [
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    CommonModule,

  ],
  exports:[
    FullLayoutComponent,
    SimpleLayoutComponent
    ]
})

export class LayoutModule { }
