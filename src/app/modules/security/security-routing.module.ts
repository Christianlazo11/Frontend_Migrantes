import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentifyComponent } from './identify/identify.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
  {
    path: 'identificar',
    component: IdentifyComponent,
  },
  {
    path: 'recuperar-contraseña',
    component: RecoverPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
