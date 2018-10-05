import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolver } from './users.resolver';
import { UserLoginComponent } from './user-login/user-login.component';
import {AuthGuard} from '../shared/services/auth-guard.service';



const usersRoutes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: UserLoginComponent
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
          user: UserResolver
        },
        canActivate: [AuthGuard]
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
