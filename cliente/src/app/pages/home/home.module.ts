import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from "../../components/components.module";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LoginModule } from '../login/login.module';
import { ResgistroModule } from '../resgistro/resgistro.module';
import { RecuperarModule } from '../recuperar/recuperar.module';
import { RouterModule } from '@angular/router';




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
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        LoginModule,
        ResgistroModule,
        RecuperarModule,
        RouterModule.forChild([]),
    ]
})
export class HomeModule { }
