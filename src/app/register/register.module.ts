import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormControlPipe, RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent,
    FormControlPipe
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[RegisterComponent]
})
export class RegisterModule { }
