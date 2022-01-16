import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoSurveyComponent } from './do-survey/do-survey.component';

const routes: Routes = [
  {
    path: 'realizar-encuesta',
    component: DoSurveyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
