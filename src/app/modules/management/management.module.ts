import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { CreatePersonComponent } from './people/create-person/create-person.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';
import { DeletePersonComponent } from './people/delete-person/delete-person.component';
import { SearchPersonComponent } from './people/search-person/search-person.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { SearchUserComponent } from './users/search-user/search-user.component';


@NgModule({
  declarations: [
    CreatePersonComponent,
    EditPersonComponent,
    DeletePersonComponent,
    SearchPersonComponent,
    CreateUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule
  ]
})
export class ManagementModule { }
