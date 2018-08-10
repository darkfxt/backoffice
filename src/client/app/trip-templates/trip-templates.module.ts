import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { TripTemplateDetailComponent } from './trip-template-detail/trip-template-detail.component';
import {TripTemplatesRoutingModule} from './trip-templates-routing.module';
import {TripTemplatesComponent} from './trip-templates.component';
import { TripMapsComponent } from './trip-template-detail/trip-maps/trip-maps.component';
import { TripTemplateItineraryComponent } from './trip-template-detail/trip-template-itinerary/trip-template-itinerary.component';
import { EventDialogComponent } from './trip-template-detail/trip-template-itinerary/event-dialog/event-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatMenuModule,
    TripTemplatesRoutingModule,
    TranslateModule
  ],
  declarations: [
    TripTemplatesComponent,
    TripTemplateDetailComponent,
    TripMapsComponent,
    TripTemplateItineraryComponent,
    EventDialogComponent
  ],
  providers: [ ],
  entryComponents: [
    EventDialogComponent
  ],
})
export class TripTemplatesModule { }
