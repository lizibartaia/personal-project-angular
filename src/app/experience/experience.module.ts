import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceComponent } from './experience.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ExperienceComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    SharedModule
  ],
  exports:[ExperienceComponent]
})
export class ExperienceModule { }
