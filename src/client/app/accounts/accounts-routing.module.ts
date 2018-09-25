import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsResolver } from './accounts.resolver';



const accountsRoutes: Routes = [
  {
    path: 'accounts',
    children: [
      {
        path: '',
        component: AccountsListComponent,
      },
      {
        path: ':id',
        component: AccountDetailComponent,
        resolve: {
          account: AccountsResolver
        }
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
