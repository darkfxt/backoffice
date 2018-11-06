import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
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
import { getSegmentDialogStatus } from '../../../../../store/route';
import { getDialogStatus } from '../../../../../store/place';
import { getSelectedDayId, getTripTemplateSelectedId } from '../../../../../store/trip-template';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../../../../../shared/modal/confirmation-modal/confirmation-modal.component';
import { eventColors } from '../../../../../shared/models/TripTemplate';

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
  colors = eventColors;

  constructor(public dialog: MatDialog, private store: Store<AppState>) { }

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

  }

  get color() {
    return this.colors[this.data.eventType];
  }

  onRemoveEvent(eventId, dayId) {
    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: 'Deseas eliminar este evento?'
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.dialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
       this.store.dispatch(new RemoveEvent({_id: eventId, dayId}));
    });
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
