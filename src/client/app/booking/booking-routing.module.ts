import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../shared/services/can-deactivate-guard.service';

import { AuthGuard } from '../shared/services/auth-guard.service';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingListComponent } from './booking-list/booking-list.component';

const bookingRoutes: Routes = [
  {
    path: 'booking',
    children: [
      {
        path: '',
        component: BookingListComponent,
        canDeactivate: [CanDeactivateGuard],
        canActivate: [AuthGuard]
      },
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
