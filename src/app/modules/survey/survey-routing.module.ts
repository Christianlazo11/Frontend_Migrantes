import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoSurveyComponent } from './do-survey/do-survey.component';
import { PruebaComponent } from './prueba/prueba.component';


const routes: Routes = [
  {
    path: 'realizar-encuesta',
    component: DoSurveyComponent,
  },
  {
    path: 'prueba',
    component: PruebaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
