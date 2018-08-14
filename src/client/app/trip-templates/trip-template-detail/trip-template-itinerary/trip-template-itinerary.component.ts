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
import {Event, TripTemplate} from '../../../shared/models/TripTemplate';
import {PaginationOptionsInterface} from '../../../shared/common-list/common-list-item/pagination-options.interface';
import {Observable, of, zip, combineLatest} from 'rxjs';
import {ListItemComponent} from '../../../shared/common-list/common-list-item/common-list-item.component';
import {EventSummarizedCardComponent} from './event-summarized-card/event-summarized-card.component';
import {AppState, eventsFromTemplateSelector, tripTemplateLoadingSelector, tripTemplateSelector} from '../../../store';
import {Store} from '@ngrx/store';


@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss'],
  animations: [
    trigger('addEventState', [
      state('out', style({transform: 'translateX(0)'})),
      state('in', style({transform: 'translateX(-100%)'})),
      state('add-in', style({transform: 'rotate(45deg)'})),
      state('add-out', style({transform: 'rotate(0deg)'})),
      transition('add-in <=> add-out', animate('100ms ease-in')),
      transition('out => in', [
        animate('0.4s', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(20px)',  offset: 0.3}),
          style({transform: 'translateX(-115%)',     offset: 0.7}),
          style({transform: 'translateX(-100%)',     offset: 1.0})
        ]))
      ]),
      transition('in => out', [
        animate('0.4s', keyframes([
          style({transform: 'translateX(-100%)',     offset: 0}),
          style({transform: 'translateX(-115%)', offset: 0.3}),
          style({transform: 'translateX(20px)',  offset: 0.7}),
          style({transform: 'translateX(0)',  offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class TripTemplateItineraryComponent implements OnInit {
  @Input()
  itinerary: FormArray;

  @Input()
  events$: Observable<any[]>;

  loading = false;
  selectedTemplateEvents$: Observable<any>;
  drawingComponent: ListItemComponent;

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
    this.selectedTemplateEvents$ = store.select(eventsFromTemplateSelector);
  }

  ngOnInit() {

    console.log('no veo noa', this.selectedTemplateEvents$)

    this.selectedTemplateEvents$.subscribe(data => console.log('laputa', data));



    this.store.select(tripTemplateSelector).subscribe((data: any) => {
      console.log('data from event', data);
      if (data.selectedTripTemplateEvents) {
        const eventsFromTemplate$ = of(data.selectedTripTemplateEvents.events);
        const loaderSelector$ = this.store.select(tripTemplateSelector);
        // this.selectedTemplateEvents$ = zip(eventsFromTemplate$, loaderSelector$,
        //   (events: Event[], loading: boolean ) => ({events, loading}));

        this.selectedTemplateEvents$ = combineLatest(loaderSelector$, eventsFromTemplate$, (loading, events) => {
          // do something here and return the "calculated" state
          loaderSelector$.subscribe((data: any) => {
            console.log('putos', data);
            return {loading: data.loading, events: data.selectedTripTemplateEvents.events}
          } );
          return {loading, events};
        });

        this.selectedTemplateEvents$.subscribe((data: any) => console.log('pitos', data));

        // this.selectedTemplateEvents$.subscribe((data: any) => console.log('perra',data));
        console.log('llloookeeey');
      }
      // this.selectedTripsEvents$ = data.tripTemplate
    });
  }

  showOptions(): void{
    this.state = this.state === 'out'? 'in': 'out';
  }

  openDialog(productType){

    this.itinerary.push(this.fb.group(new Event()));
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '80%',
      height: '80%',
      maxWidth: '1024px',
      id: 'eventDialog',
      panelClass: 'eventDialogPanel',
      data: {productType: productType},
      disableClose: true,
      closeOnNavigation: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

