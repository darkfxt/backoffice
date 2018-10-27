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
import { AddDay, DaySelected } from '../../../store/trip-template/day/day.actions';


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
            if (data) {
              this.itineraryDays = data;
            }
          }));
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
        dialog: 'select'
        },
      disableClose: true,
      closeOnNavigation: true
    };
     this.store.dispatch(new DayIndexTypeForEventSetted(event.day, event.ordinal, event.productType ));
     this.dialogReference = this.dialog.open(EventDialogComponent, dialogConfig);

    this.dialogReference.afterClosed().subscribe(result => {
      //this.hideEmptySlot();
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


}
