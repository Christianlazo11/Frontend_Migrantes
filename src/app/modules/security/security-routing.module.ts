import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentifyComponent } from './identify/identify.component';
import { LogoutComponent } from './logout/logout.component';
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
  {
    path: 'cerrar-sesion',
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
