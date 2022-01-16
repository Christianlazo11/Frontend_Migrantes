import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { DoSurveyComponent } from './do-survey/do-survey.component';


@NgModule({
  declarations: [
    DoSurveyComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
