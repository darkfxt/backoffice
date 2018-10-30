import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { BookingDetailHeaderComponent } from './booking-detail/booking-detail-header/booking-detail-header.component';
import { BookingDetailStatusComponent } from './booking-detail/booking-detail-status/booking-detail-status.component';
import { BookingDetailItineraryComponent } from './booking-detail/booking-detail-itinerary/booking-detail-itinerary.component';
import { BookingRoutingModule } from './booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatStepperModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  declarations: [
    BookingListComponent,
    BookingDetailComponent,
    BookingDetailHeaderComponent,
    BookingDetailStatusComponent,
    BookingDetailItineraryComponent
  ]
})
export class BookingModule {
}
