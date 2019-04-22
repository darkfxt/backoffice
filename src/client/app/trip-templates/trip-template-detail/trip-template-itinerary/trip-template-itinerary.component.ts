import {
  Component,
  OnInit,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter, PipeTransform, Pipe
} from '@angular/core';
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
import { Event, TripTemplate, TypeOfEvent, DayOfTrip } from '../../../shared/models/TripTemplate';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, of, zip, combineLatest, Subscription } from 'rxjs';
import { ListItemComponent } from '../../../shared/common-list/common-list-item/common-list-item.component';
import { EventSummarizedCardComponent } from './event-summarized-card/event-summarized-card.component';
import { select, Store } from '@ngrx/store';
import {
  GetTripTemplates,
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
import { AppState } from '../../../store/shared/app.interfaces';
import {
  getAllDays,
  getAllEvents,
  getDaysForSelectedTrip,
  getEventEntities, getSelectedDayId,
  getTripTemplateSelectedId,
  getTripTemplatesEntities
} from '../../../store/trip-template';
import { getSegmentDialogStatus, getSegmentsEntityState } from '../../../store/route';
import { getDialogStatus, getPointsEntity } from '../../../store/place';
import { AddEvent, DayIndexTypeForEventSetted } from '../../../store/trip-template/event/event.actions';
import {AddDay, DaySelected, MoveDay, RemoveDay} from '../../../store/trip-template/day/day.actions';
import { ConfirmationModalComponent } from '../../../shared/modal/confirmation-modal/confirmation-modal.component';
import * as moment from 'moment';
import {TRANSLATE} from '../../../translate-marker';
import {TranslateService} from '@ngx-translate/core';

@Pipe({name: 'numberToArray'})
export class NumberToArray implements PipeTransform {
  transform(value, args: string[]): any {
    const respArray = [];
    for (let i = 0; i < value; i++) {
      respArray.push(i);
    }
    return respArray;
  }
}

@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss'],

})
export class TripTemplateItineraryComponent implements OnInit, OnDestroy {
  @Input()
  itinerary: FormArray;
  @Input() bookingStartDate?: string;
  first = false;
  showEmptySlot: boolean;
  loading = false;
  tripTemplateEntities$: Observable<any>;
  itineraryDays: Array<any> = [];
  drawingComponent: ListItemComponent;
  typeForEvent: TypeOfEvent;
  headerCollapsed: boolean;
  dialogReference: any;
  dialogReferenceSub: any;
  _subscription: Subscription;
  subs: Array<Subscription> = [];
  dialogStatus$: Observable<any>;
  segmentStatus$: Observable<any>;
  selectedDay$: Observable<string>;
  selectedTripTemplate$: Observable<string>;
  editedDayId;
  @Output() itineraryUpdated: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dayList') dayList: ElementRef;


  state = 'out';
  productTypes = [
    {value: 'driving', viewValue: 'driving'},
    {value: 'hotel', viewValue: 'hotel'},
    {value: 'activity', viewValue: 'activity'},
    {value: 'other', viewValue: 'other'}
  ];

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private render: Renderer2,
    private ts: TranslateService
  ) {
    this.drawingComponent = new ListItemComponent(EventSummarizedCardComponent);
    this.tripTemplateEntities$ = this.store.pipe(select(getTripTemplatesEntities));
  }


  ngOnInit() {
    this.dialogStatus$ = this.store.pipe(select(getDialogStatus));
    this.segmentStatus$ = this.store.pipe(select(getSegmentDialogStatus));
    this.selectedDay$ = this.store.pipe(select(getSelectedDayId));
    this.selectedTripTemplate$ = this.store.pipe(select(getTripTemplateSelectedId));

    this.dialogStatus$.subscribe((data: any) => {
      if (data && data === 'close') {
        if (this.dialogReference)
          this.dialogReference.close();
        if (this.dialogReferenceSub)
          this.dialogReferenceSub.close();
        this.store.dispatch(new ToggleDialogPoint(DialogActions.FALSE));
      }
    });

    this.segmentStatus$.subscribe((data: any) => {
      if (data && data === 'close') {
        if (this.dialogReference)
          this.dialogReference.close();
        if (this.dialogReferenceSub)
          this.dialogReferenceSub.close();
        this.store.dispatch(new ToggleSegmentDialog(DialogActions.FALSE));
      }
    });

    setTimeout(this.loadItinerary());
  }

  private loadItinerary() {
     this.subs.push(this.tripTemplateEntities$.subscribe((tripTemplateEntities: any) => {
      this.subs.push(this.selectedTripTemplate$.subscribe(selectedTemplate => {
        if (Object.keys(tripTemplateEntities).includes(selectedTemplate)) {
          this.subs.push(this.store.select(getDaysForSelectedTrip).subscribe((data: any) => {
            if (data && data.length > 0) {

              this.itineraryDays = data;
              this.itinerary = this.fb.array([]);
              data.forEach( (day: any) => {
                let eventsForm;
                eventsForm = this.fb.array([]);

                day.events.forEach((evento: any) => {
                  eventsForm.push(this.fb.group({
                    name: evento.name,
                    description: evento.description,
                    product: evento.product,
                    dayId: evento.dayId,
                    event_type: evento.event_type,
                    order: evento.order,
                    _id: evento._id
                  }));
                });
                this.itinerary.push(this.fb.group({
                  _id: day._id,
                  events: eventsForm
                }));
              });
              if (selectedTemplate === 'new' && data.length === 1 && !this.first) {
                this.openEmptySlot(this.itineraryDays[0]._id);
                this.first = true;
              }
              this.itineraryUpdated.emit(this.itinerary);
          }}));
        }
      }));
    }));
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this.subs.forEach(sub => sub.unsubscribe());
  }

  openEmptySlot(day): void {
    this.store.dispatch(new DaySelected(day));
    this.editedDayId = day;
  }

  hideEmptySlot(): void {
    this.editedDayId = undefined;
  }

  addDay() {
    const diaNuevo = new DayOfTrip( []);
    this.store.dispatch(new AddDay(diaNuevo));
    setTimeout(() => {
      this.dayList.nativeElement.scrollTop = this.dayList.nativeElement.scrollHeight;
    }, 100);
  }

  toggleHeader(): void {
    this.headerCollapsed = !this.headerCollapsed;
  }

  getDay(dayIndx) {
    const date = new Date(this.bookingStartDate);
    date.setDate(date.getDate() + dayIndx);
    return date;
    // return moment(this.bookingStartDate).add(dayIndx, 'days').format('MMMM Do YYYY');
  }

  openDialog(event) {
    if (!event.productType) {
      this.hideEmptySlot();
      return false;
    }
    const dialogConfig = {
      height: '80%',
      width: '80%',
      id: 'eventDialog',
      panelClass: 'eventDialogPanel',
      data: {
        productType: event.productType,
        dialog: 'select',
        day: event.day
        },
      disableClose: true,
      closeOnNavigation: true
    };
     this.store.dispatch(new DayIndexTypeForEventSetted(event.day, event.ordinal, event.productType ));
     this.dialogReference = this.dialog.open(EventDialogComponent, dialogConfig);

    this.dialogReference.afterClosed().subscribe(result => {
      // this.hideEmptySlot();
      if (result === 'OPEN_NEW_ROUTES') {
        this.store.dispatch(new ToggleSegmentDialog(DialogActions.TRUE));
        this.dialogReferenceSub = this.dialog.open(RouteComponent, dialogConfig);
        this.dialogReferenceSub.afterClosed().subscribe(res => {
          this.store.dispatch(new ToggleSegmentDialog(DialogActions.CLOSE));
        });
       }
      if (result === 'OPEN_NEW_PLACES') {
        this.store.dispatch(new ToggleDialogPoint(DialogActions.TRUE));
        this.dialogReferenceSub = this.dialog.open(PointComponent, dialogConfig);
        this.dialogReferenceSub.afterClosed().subscribe(res => {
          this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE));
        });
      }
       this.state = 'out';
     });
  }

  deleteDay(dayId) {
    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: this.ts.instant(TRANSLATE('Deseas eliminar este día?'))
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.dialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this.store.dispatch(new RemoveDay({_id: dayId}));
    });
  }

  moveDay(oldPosition, newPosition) {
    this.store.dispatch(new MoveDay({fromIndex: oldPosition, toIndex: newPosition}));
  }


}
