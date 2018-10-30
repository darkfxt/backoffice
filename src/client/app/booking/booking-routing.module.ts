import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';

const bookingRoutes: Routes = [
  {
    path: 'booking',
    children: [
      {
        path: ':id',
        component: BookingDetailComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(bookingRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BookingRoutingModule { }
