import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceComponent, FormControlPipe } from './experience.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExperienceComponent,
    FormControlPipe
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ExperienceComponent]
})
export class ExperienceModule { }
