import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonComponent } from './people/create-person/create-person.component';
import { DeletePersonComponent } from './people/delete-person/delete-person.component';
import { EditPersonComponent } from './people/edit-person/edit-person.component';
import { SearchPersonComponent } from './people/search-person/search-person.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { SearchUserComponent } from './users/search-user/search-user.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CreatePersonComponent,
  },
  {
    path: 'editar-persona',
    component: EditPersonComponent,
  },
  {
    path: 'eliminar-persona',
    component: DeletePersonComponent,
  },
  {
    path: 'buscar-persona',
    component: SearchPersonComponent,
  },
  {
    path: 'crear-usuario',
    component: CreateUserComponent,
  },
  {
    path: 'editar-usuario/:id',
    component: EditUserComponent,
  },
  {
    path: 'eliminar-usuario',
    component: DeleteUserComponent,
  },
  {
    path: 'lista-usuarios',
    component: SearchUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
