import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { PruebaComponent } from './prueba/prueba.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchSurveyComponent } from './search-survey/search-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';


@NgModule({
  declarations: [
    DoSurveyComponent,
    PruebaComponent,
    SearchSurveyComponent,
    EditSurveyComponent,
    CreateSurveyComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SurveyModule { }
