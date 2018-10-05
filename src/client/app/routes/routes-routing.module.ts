import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';

import { RoutesComponent } from './routes.component';
import { RoutesResolver } from './routes.resolver';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import {AuthGuard} from '../shared/services/auth-guard.service';

const rRoutes: Routes = [
  {
    path: 'routes',
    children: [
      {
        path: '',
        component: RoutesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'modal',
        component: RouteDetailComponent

      },
      {
        path: ':id',
        component: RouteDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          segment: RoutesResolver
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(rRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesRoutingModule { }
