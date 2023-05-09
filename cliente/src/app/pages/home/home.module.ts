import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from "../../components/components.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';




@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ComponentsModule,
        MatSlideToggleModule,
        MatSidenavModule
    ]
})
export class HomeModule { }
