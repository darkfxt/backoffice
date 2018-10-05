import { Component, OnInit, Inject, Input, OnDestroy, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatBottomSheet, MatDialog } from '@angular/material';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { RouteComponent } from '../../../routes/route/route.component';
import { FormArray, FormBuilder } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';
import { Event, TripTemplate, eventType } from '../../../shared/models/TripTemplate';
import { PaginationOptionsInterface } from '../../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, of, zip, combineLatest, Subscription } from 'rxjs';
import { ListItemComponent } from '../../../shared/common-list/common-list-item/common-list-item.component';
import { EventSummarizedCardComponent } from './event-summarized-card/event-summarized-card.component';
import {
  AppState,
  eventsFromTemplateSelector,
  pointSelector,
  segmentSelector,
  tripTemplateLoadingSelector,
  tripTemplateSelector
} from '../../../store';
import { Store } from '@ngrx/store';
import {
  AddEvent,
  DayIndexTypeForEventSetted,
  SetDescriptionForTemplate,
  SetNameForTemplate
} from '../../../store/trip-template/trip-template.actions';
import * as _ from 'lodash';
import { PlacesComponent } from '../../../places/places.component';
import { PointComponent } from '../../../places/point/point.component';
import { ClearSegment, ToggleSegmentDialog } from '../../../store/route/route.actions';
import { ToggleDialogPoint } from '../../../store/place/place.actions';
import { DialogActions } from '../../../store/dialog-actions.enum';
import { BottomSheetEventComponent } from './add-event/add-event.component';


@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss'],

})
export class TripTemplateItineraryComponent implements OnInit, OnDestroy {
  @Input()
  itinerary: FormArray;
  showOverlay: boolean;
  showEmptySlot: boolean;
  loading = false;
  selectedTemplateEvents$: Observable<any>;
  itineraryEvents: Array<any> = [];
  drawingComponent: ListItemComponent;
  dayOfEvent: number;
  typeForEvent: string;
  ordinalForEvent: string;
  headerCollapsed: boolean;
  dialogReference: any;
  dialogReferenceSub: any;
  _subscription: Subscription;

  @ViewChild('dayList') dayList: ElementRef;


  state = 'out';
  addEventText = {'in': 'close', 'out': 'add'};
  productTypes = [
    {value: 'DRIVING', viewValue: 'driving'},
    {value: 'HOTEL', viewValue: 'hotel'},
    {value: 'ACTIVITY', viewValue: 'activity'},
    {value: 'OTHER', viewValue: 'other'}
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private render: Renderer2
  ) {
    this.drawingComponent = new ListItemComponent(EventSummarizedCardComponent);
    this.selectedTemplateEvents$ = store.select(tripTemplateSelector);

  }


  ngOnInit() {

    this.store.select(segmentSelector).subscribe( (data: any) => {
      if (data && data.dialog === DialogActions.CLOSE)
        if (this.dialogReferenceSub)
          this.dialogReferenceSub.close();
    });
    this.store.select(pointSelector).subscribe( (data: any) => {
      if (data && data.dialog === DialogActions.CLOSE)
        if (this.dialogReferenceSub)
          this.dialogReferenceSub.close();
    });

    this._subscription = this.store.select(tripTemplateSelector).subscribe((data: any) => {
      if (data.selectedTripTemplateEvents) {
        /// TODO:: Me parece que la ailanié, ver si se puede mejorar.
        const arrangedEvents = [];
        data.selectedTripTemplateEvents.forEach((event, index, array) =>
          arrangedEvents.push(Object.assign({}, event, {index})));
        const arreglo = [];
        _.forEach(_.groupBy(arrangedEvents, 'ordinal'),
          (value, key) => {
            arreglo.push({day: key, events: value});
          });
        this.itineraryEvents.splice(0, this.itineraryEvents.length);
        this.itineraryEvents = arreglo;
        // this.itinerary.patchValue(data.selectedTripTemplateEvents);
      }
      if (data.ordinalForEvent) this.ordinalForEvent = data.ordinalForEvent;
      if (data.dayForEvent) this.dayOfEvent = data.dayForEvent;
      if (data.typeForEvent) this.typeForEvent = data.typeForEvent;
      if (data.selectedEvent) this.addEvent(data.selectedEvent);
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  openEmptySlot(): void {
    this.showOverlay = true;
    this.showEmptySlot = true;
  }

  hideEmptySlot(): void {
    this.showOverlay = false;
    this.showEmptySlot = false;
  }

  addEvent(eventToAdd) {
    if (this.dialogReference) {
      this.dialogReference.close();
    }
    if (this.dialogReferenceSub) {
      this.dialogReferenceSub.close();
    }
    const newEvent: Event = this.convertToEvent(eventToAdd, this.typeForEvent, this.dayOfEvent);
    this.store.dispatch(new AddEvent(newEvent));
    // setTimeout(this.store.dispatch(new ClearSegment()), 500);
  }

  convertToEvent(toConvert: any, event_type: string, order: number): Event {
    const converted: Event = new Event();
    converted.name = toConvert.name;
    converted.description = toConvert.description;
    converted.reference_id = toConvert._id;
    converted.event_type = this.typeForEvent;
    converted.ordinal = order || 1;
    switch (this.typeForEvent) {
      case eventType.ACTIVITY:
      case eventType.HOTEL:
        converted.geo = [toConvert.geo.point];
        break;
      case eventType.DRIVING:
        const geo = [];
        // geo.push(toConvert.origin.geo.point);
        // toConvert['middle_points'].forEach(point => geo.push(point.geo.point));
        // geo.push(toConvert.destination.geo.point);
        geo.push({origin: toConvert.origin, middle_points: toConvert['middle_points'], destination: toConvert.destination});
        converted.geo = geo;
        break;
      default:
        converted.geo = [];
    }
    return converted;
  }

  addDay() {
    this.itineraryEvents.push({day: ((this.itineraryEvents.length || 0) + 1).toString(), events: []});
    setTimeout(() => {
      this.dayList.nativeElement.scrollTop = this.dayList.nativeElement.scrollHeight;
    }, 100);
  }

  toggleHeader(): void {
    this.headerCollapsed = !this.headerCollapsed;
  }

  openDialog(event) {
    if (!event.productType) {
      this.hideEmptySlot();
      return false;
    }
    const dialogConfig = {
      height: '80%',
      maxWidth: '1024px',
      id: 'eventDialog',
      panelClass: 'eventDialogPanel',
      data: {
        productType: event.productType,
        dialog: true
        },
      disableClose: true,
      closeOnNavigation: true
    };
     // this.store.dispatch(new SetNameForTemplate(this.itinerary.value.username) && new SetDescriptionForTemplate (this.itinerary.value.description));
     // this.store.dispatch(new SetDescriptionForTemplate (this.itinerary.value.description));
     this.store.dispatch(new DayIndexTypeForEventSetted(event.day, event.ordinal, event.productType ));
     this.dialogReference = this.dialog.open(EventDialogComponent, dialogConfig);

    this.dialogReference.afterClosed().subscribe(result => {
      this.showEmptySlot = false;
      this.showOverlay = false;
      if (result === 'OPEN_NEW_ROUTES') {
        this.store.dispatch(new ToggleSegmentDialog(DialogActions.TRUE));
        this.dialogReferenceSub = this.dialog.open(RouteComponent, dialogConfig);
        this.dialogReferenceSub.afterClosed().subscribe(res => {
          this.store.dispatch(new ToggleSegmentDialog(DialogActions.FALSE));
        });
       }
      if (result === 'OPEN_NEW_PLACES') {
        this.store.dispatch(new ToggleDialogPoint(DialogActions.TRUE));
        this.dialogReferenceSub = this.dialog.open(PointComponent, dialogConfig);
        this.dialogReferenceSub.afterClosed().subscribe(res => {
          this.store.dispatch(new ToggleDialogPoint(DialogActions.FALSE));
        });
      }
       this.state = 'out';
     });
  }


}
