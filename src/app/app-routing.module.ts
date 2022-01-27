import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './templates/error/error.component';
import { HomeComponent } from './templates/home/home.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio',
  },
  {
    path: 'seguridad',
    loadChildren: () =>
      import('./modules/security/security.module').then(
        (x) => x.SecurityModule
      ),
  },
  {
    path: 'administracion',
    loadChildren: () =>
      import('./modules/management/management.module').then(
        (x) => x.ManagementModule
      ),
  },
  {
    path: 'encuesta',
    loadChildren: () =>
      import('./modules/survey/survey.module').then((x) => x.SurveyModule),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
  
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
