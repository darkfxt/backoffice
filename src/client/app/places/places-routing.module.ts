import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PointComponent} from './point/point.component';
import {PlacesComponent} from './places.component';

import {AuthGuard} from '../shared/services/auth-guard.service';
import {CanDeactivateGuard} from '../shared/services/can-deactivate-guard.service';
import {PointResolver} from './point/point.resolver';

const placesRoutes: Routes = [
  {
    path: 'places',
    children: [
      {
        path: '',
        component: PlacesComponent,
      },
      {
        path: ':id',
        component: PointComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          point: PointResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(placesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlacesRoutingModule { }
