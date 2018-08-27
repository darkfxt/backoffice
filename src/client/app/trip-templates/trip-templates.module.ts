import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatSelectModule, MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import { TripTemplateDetailComponent } from './trip-template-detail/trip-template-detail.component';
import {TripTemplatesRoutingModule} from './trip-templates-routing.module';
import {TripTemplatesComponent} from './trip-templates.component';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store';
import {CommonListModule} from '../shared/common-list/common-list.module';
import { TripTemplateSummarizedCardComponent } from './trip-template-summarized-card/trip-template-summarized-card.component';
import { EventDialogComponent } from './trip-template-detail/trip-template-itinerary/event-dialog/event-dialog.component';
import {TripTemplateItineraryComponent} from './trip-template-detail/trip-template-itinerary/trip-template-itinerary.component';
import {RoutesModule} from '../routes/routes.module';
import {SharedModule} from '../shared/shared.module';
import { EventSummarizedCardComponent } from './trip-template-detail/trip-template-itinerary/event-summarized-card/event-summarized-card.component';
import { AddEventComponent } from './trip-template-detail/trip-template-itinerary/add-event/add-event.component';
import {PlacesModule} from '../places/places.module';
import { TripTemplateMapComponent } from './trip-template-detail/trip-template-map/trip-template-map.component';
import {RouteComponent} from '../routes/route/route.component';
import {PlacesComponent} from '../places/places.component';
import {PointComponent} from '../places/point/point.component';

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
    MatTooltipModule,
    TripTemplatesRoutingModule,
    TranslateModule,
    PlacesModule,
    RoutesModule,
    SharedModule
  ],
  declarations: [
    TripTemplatesComponent,
    TripTemplateDetailComponent,
    TripTemplateSummarizedCardComponent,
    TripTemplateItineraryComponent,
    EventDialogComponent,
    EventSummarizedCardComponent,
    AddEventComponent,
    TripTemplateMapComponent
  ],
  providers: [ ],
  entryComponents: [
    EventDialogComponent, RouteComponent, PointComponent
  ],
})
export class TripTemplatesModule { }