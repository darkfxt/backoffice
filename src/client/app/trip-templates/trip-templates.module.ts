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
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store';
import {CommonListModule} from '../shared/common-list/common-list.module';
import { TripTemplateSummarizedCardComponent } from './trip-template-summarized-card/trip-template-summarized-card.component';
import { EventDialogComponent } from './trip-template-detail/trip-template-itinerary/event-dialog/event-dialog.component';
import {TripTemplateItineraryComponent} from './trip-template-detail/trip-template-itinerary/trip-template-itinerary.component';
import {RoutesModule} from '../routes/routes.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    StoreModule.forFeature('tripTemplates', reducers),
    CommonModule,
    CommonListModule,
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
    TranslateModule,
    RoutesModule,
    SharedModule
  ],
  declarations: [
    TripTemplatesComponent,
    TripTemplateDetailComponent,
    TripMapsComponent,
    TripTemplateSummarizedCardComponent,
    TripTemplateItineraryComponent,
    EventDialogComponent
  ],
  providers: [ ],
  entryComponents: [
    EventDialogComponent
  ],
})
export class TripTemplatesModule { }
