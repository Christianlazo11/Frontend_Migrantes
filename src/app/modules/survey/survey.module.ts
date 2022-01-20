import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { PruebaComponent } from './prueba/prueba.component';


@NgModule({
  declarations: [
    DoSurveyComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
