import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateSurveyComponent } from "./create-survey/create-survey.component";
import { DoSurveyComponent } from "./do-survey/do-survey.component";
import { EditSurveyComponent } from "./edit-survey/edit-survey.component";
import { PruebaComponent } from "./prueba/prueba.component";
import { SearchSurveyComponent } from "./search-survey/search-survey.component";

const routes: Routes = [
  {
    path: "realizar-encuesta",
    component: DoSurveyComponent,
  },
  {
    path: "buscar-encuesta",
    component: SearchSurveyComponent,
  },
  {
    path: "editar-encuesta/:id",
    component: EditSurveyComponent,
  },
  {
    path: "crear-encuesta/:id",
    component: CreateSurveyComponent,
  },
  {
    path: "prueba",
    component: PruebaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
