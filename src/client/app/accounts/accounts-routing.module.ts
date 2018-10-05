import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsResolver } from './accounts.resolver';
import {AuthGuard} from '../shared/services/auth-guard.service';



const accountsRoutes: Routes = [
  {
    path: 'accounts',
    children: [
      {
        path: '',
        component: AccountsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: AccountDetailComponent,
        resolve: {
          account: AccountsResolver
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(accountsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountsRoutingModule { }
