import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {CanDeactivateGuard} from '../shared/services/can-deactivate-guard.service';

import {TripTemplatesResolver} from './trip-templates.resolver';
import {TripTemplateDetailComponent} from './trip-template-detail/trip-template-detail.component';
import {TripTemplatesComponent} from './trip-templates.component';

const tripTemplatesRoutes: Routes = [
  {
    path: 'trip-templates',
    children: [
      {
        path: '',
        component: TripTemplatesComponent,
      },
      {
        path: ':id',
        component: TripTemplateDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          tripTemplate: TripTemplatesResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(tripTemplatesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TripTemplatesRoutingModule { }
