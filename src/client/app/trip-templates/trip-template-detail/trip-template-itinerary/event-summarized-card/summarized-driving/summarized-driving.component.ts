import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../../../../store/shared/app.interfaces';
import {
  DayIndexTypeForEventSetted, DrivingEventSelected,
  RemoveEvent,
  UpdateEvent
} from '../../../../../store/trip-template/event/event.actions';
import { PointComponent } from '../../../../../places/point/point.component';
import { DialogActions } from '../../../../../store/dialog-actions.enum';
import { ToggleDialogPoint } from '../../../../../store/place/place.actions';
import { EventDialogComponent } from '../../event-dialog/event-dialog.component';
import { ToggleSegmentDialog } from '../../../../../store/route/route.actions';
import { RouteComponent } from '../../../../../routes/route/route.component';
import { MatDialog } from '@angular/material';
import { terminalType } from '../../../../../shared/models/TripTemplate';
import {getSegmentDialogStatus} from '../../../../../store/route';
import {getDialogStatus} from '../../../../../store/place';
import {getSelectedDayId, getTripTemplateSelectedId} from '../../../../../store/trip-template';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-summarized-driving',
  templateUrl: './summarized-driving.component.html',
  styleUrls: ['./summarized-driving.component.scss']
})
export class SummarizedDrivingComponent implements OnInit {

  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;
  showOverlay: boolean;
  dialogReference: any;
  dialogReferenceSub: any;
  state = 'out';
  dialogStatus$: Observable<any>;
  segmentStatus$: Observable<any>;
  selectedDay$: Observable<string>;
  selectedTripTemplate$: Observable<string>;
  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit() {
    console.log('Dentro del summarized driving');
    console.log(this.data);
    this.dialogStatus$ = this.store.pipe(select(getDialogStatus));
    this.segmentStatus$ = this.store.pipe(select(getSegmentDialogStatus));
    this.selectedDay$ = this.store.pipe(select(getSelectedDayId));
    this.selectedTripTemplate$ = this.store.pipe(select(getTripTemplateSelectedId));

    this.dialogStatus$.subscribe((data: any) => {
      if (data && data === 'close') {
        if (this.dialogReference)
          this.dialogReference.close();
        // this.store.dispatch(new ToggleDialogPoint(DialogActions.FALSE));
      }
    });

    this.segmentStatus$.subscribe((data: any) => {
      if (data && data === 'close') {
        if (this.dialogReference)
          this.dialogReference.close();
        // this.store.dispatch(new ToggleSegmentDialog(DialogActions.FALSE));
      }
    });
  }

  onRemoveEvent(index) {
    this.store.dispatch(new RemoveEvent(index));
  }

  onUpdateEvent(id, day) {
    const updatedEvent = this.data;
    updatedEvent.product.origin = {
      '_id': '5bc8f251b58f4a0010536668',
      'name': 'Cachi',
      'search_name': 'Cachi',
      'description': 'Ciudad de Cachi',
      'type': 'REFERENCE',
      'geo': {
        'label': '-25.120235,-66.162496',
        'point': {
          'lat': -25.1202353,
          'lng': -66.16249649999997
        },
        'address': {
          'country_code': 'AR',
          'country': 'Argentina',
          'locality': 'Cachi',
          'region': 'Salta',
          'postalCode': '',
          'route': '',
          'street_number': '',
          'formatted_address': 'Cachi, Salta, Argentina'
        }
      },
      'images': [],
      'place_id': 'ChIJd0e5BEIeHJQRRVAm2F8cxMw',
      'status': 1,
      'company_id': 1,
      'created_by': 'jerez.matias@gmail.com'
    };
    this.store.dispatch(new UpdateEvent(updatedEvent));
  }

  hideEmptySlot(): void {
    this.showOverlay = false;
    this.showEmptySlot = false;
  }

  openDialog(event, terminal: string) {
    if (!event.productType) {
      this.hideEmptySlot();
      return false;
    }
    this.store.dispatch(new DrivingEventSelected({event: this.data, terminal}));
    const dialogConfig = {
      height: '80%',
      maxWidth: '1024px',
      id: 'eventDialog',
      panelClass: 'eventDialogPanel',
      data: {
        productType: event.productType,
        dialog: 'update',
        eventToUpdate: this.data
      },
      disableClose: true,
      closeOnNavigation: true
    };
    this.store.dispatch(new DayIndexTypeForEventSetted(this.data.dayId, this.data._id, event.productType ));
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
