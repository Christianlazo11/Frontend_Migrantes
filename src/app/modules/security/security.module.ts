import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { IdentifyComponent } from './identify/identify.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangeOfPasswordComponent } from './change-of-password/change-of-password.component';


@NgModule({
  declarations: [
    IdentifyComponent,
    RecoverPasswordComponent,
    ChangeOfPasswordComponent
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
