import {Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {FormArray, FormBuilder} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';
import {Event, TripTemplate, eventType} from '../../../shared/models/TripTemplate';
import {PaginationOptionsInterface} from '../../../shared/common-list/common-list-item/pagination-options.interface';
import {Observable, of, zip, combineLatest} from 'rxjs';
import {ListItemComponent} from '../../../shared/common-list/common-list-item/common-list-item.component';
import {EventSummarizedCardComponent} from './event-summarized-card/event-summarized-card.component';
import {AppState, eventsFromTemplateSelector, tripTemplateLoadingSelector, tripTemplateSelector} from '../../../store';
import {Store} from '@ngrx/store';
import {AddEvent} from '../../../store/trip-template/trip-template.actions';
import * as _ from 'lodash';


@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss'],

})
export class TripTemplateItineraryComponent implements OnInit {
  @Input()
  itinerary: FormArray;

  // @Input()
  // events$: Observable<any[]>;

  loading = false;
  selectedTemplateEvents$: Observable<any>;
  itineraryEvents: Array<any> = [];
  drawingComponent: ListItemComponent;
  dayOfEvent: number;

  state = 'out';
  addEventText = {'in': 'close', 'out': 'add'};
  productTypes = [
    {value: 'DRIVING', viewValue: 'driving'},
    {value: 'HOTEL', viewValue: 'hotel'},
    {value: 'ACTIVITY', viewValue: 'activity'},
    {value: 'OTHER', viewValue: 'other'}
  ];

  constructor(public dialog: MatDialog, private fb: FormBuilder, private store: Store<AppState>) {
    this.drawingComponent = new ListItemComponent(EventSummarizedCardComponent);
    this.selectedTemplateEvents$ = store.select(tripTemplateSelector);
  }

  ngOnInit() {

    this.store.select(tripTemplateSelector).subscribe((data: any) => {
      if (data.selectedTripTemplateEvents) {
        const arrangedEvents = [];
        data.selectedTripTemplateEvents.forEach((event, index, array) =>
          arrangedEvents.push(Object.assign({}, event, {index})));
        const arreglo = [];
        _.forEach(_.groupBy(arrangedEvents, 'ordinal'),
          (value, key) => arreglo.push({day: key, events: value}));
        this.itineraryEvents = arreglo;

      }
      if(data.dayForEvent) this.dayOfEvent = data.dayForEvent;
      if(data.selectedEvent) {
        this.addEvent(data.selectedEvent);
      }
    });
  }

  showOptions(): void{
    this.state = this.state === 'out'? 'in': 'out';
  }

  // openDialog(productType){
//
  //   this.itinerary.push(this.fb.group(new Event()));
  //   const dialogRef = this.dialog.open(EventDialogComponent, {
  //     width: '80%',
  //     height: '80%',
  //     maxWidth: '1024px',
  //     id: 'eventDialog',
  //     panelClass: 'eventDialogPanel',
  //     data: {productType: productType},
  //     disableClose: true,
  //     closeOnNavigation: true
  //   });
//
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  addEvent(eventToAdd){
    this.dialog.closeAll();
    const newEvent: Event = this.convertToEvent(eventToAdd, eventType.CUSTOM, this.dayOfEvent);
    this.store.dispatch(new AddEvent(newEvent));
  }

  convertToEvent(toConvert: any, event_type: eventType, order: number): Event{
    const converted: Event = new Event();
    converted.name = toConvert.name;
    converted.description = toConvert.description;
    converted.reference_id = toConvert._id;
    converted.event_type = event_type;
    converted.ordinal = order || 1;
    // converted.index = order;
    return converted;
  }

  addDay(){
    this.itineraryEvents.push({day: ((this.itineraryEvents.length || 0) + 1).toString(), events: []});
  }

}

