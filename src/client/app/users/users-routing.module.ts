import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './users.resolver';



const usersRoutes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersListComponent,
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
          user: UserResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule { }
