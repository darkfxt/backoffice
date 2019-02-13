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
import {
  MatButtonModule, MatFormFieldModule, MatNativeDateModule,
  MatIconModule, MatStepperModule, MatAutocompleteModule,
  MatOptionModule, MatInputModule, MatDatepickerModule, MatSlideToggleModule, MatMenuModule, MatTooltipModule
} from '@angular/material';
import { TripTemplatesModule } from '../trip-templates/trip-templates.module';
import { TranslateModule } from '@ngx-translate/core';
import { BookingSummarizedCardComponent } from './booking-list/booking-summarized-card/booking-summarized-card.component';
import { CommonListModule } from '../shared/common-list/common-list.module';
import { BookingFiltersComponent } from './booking-filters/booking-filters.component';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TripTemplatesModule,
    CommonListModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TranslateModule,
    MatMenuModule,
    MatTooltipModule
  ],
  declarations: [
    BookingListComponent,
    BookingDetailComponent,
    BookingDetailHeaderComponent,
    BookingDetailStatusComponent,
    BookingDetailItineraryComponent,
    BookingSummarizedCardComponent,
    BookingFiltersComponent
  ],
  providers: [],
  exports: [BookingSummarizedCardComponent]
})
export class BookingModule {
}
