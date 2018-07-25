import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CanDeactivateGuard} from '../shared/services/can-deactivate-guard.service';

import {RouteComponent} from './route/route.component';
import {RoutesComponent} from './routes.component';
import {RoutesResolver} from './routes.resolver';

const rRoutes: Routes = [
  {
    path: 'routes',
    children: [
      {
        path: '',
        component: RoutesComponent,
      },
      {
        path: ':id',
        component: RouteComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          segment: RoutesResolver
        }
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
