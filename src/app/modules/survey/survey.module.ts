import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DoSurveyComponent,
    PruebaComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SurveyModule { }
