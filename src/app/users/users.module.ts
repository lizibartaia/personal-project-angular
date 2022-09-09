import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { FormControlPipe,UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from '../register/register.component';


@NgModule({
  declarations: [
    UsersComponent,
    FormControlPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UsersComponent],
  entryComponents:[RegisterComponent]
})
export class UsersModule { }
