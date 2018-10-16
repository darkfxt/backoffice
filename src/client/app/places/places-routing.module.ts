import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';
import { PointResolver } from './point/point.resolver';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import { PlacesComponent } from './places.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const placesRoutes: Routes = [
  {
    path: 'places',
    children: [
      {
        path: '',
        component: PlacesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: PlaceDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          point: PointResolver
        },
        canActivate: [AuthGuard]
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
