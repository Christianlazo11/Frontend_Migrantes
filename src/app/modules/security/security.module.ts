import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { IdentifyComponent } from './identify/identify.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangeOfPasswordComponent } from './change-of-password/change-of-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    IdentifyComponent,
    RecoverPasswordComponent,
    ChangeOfPasswordComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SecurityModule {}
