import { Component, Input, OnInit } from '@angular/core';
import {eventColors, iconMap} from '../../../../../shared/models/TripTemplate';
import { ConfirmationModalComponent } from '../../../../../shared/modal/confirmation-modal/confirmation-modal.component';
import { AppState } from '../../../../../store/shared/app.interfaces';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { RemoveEvent } from '../../../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-summarized-default',
  templateUrl: './summarized-default.component.html',
  styleUrls: ['./summarized-default.component.scss']
})
export class SummarizedDefaultComponent implements OnInit {
  @Input() data: any;
  @Input() day: any;
  @Input() showEmptySlot: boolean;
  @Input() editMode: boolean;
  iconMap = iconMap;
  colors = eventColors;
  constructor(public dialog: MatDialog, private store: Store<AppState>) { }


  ngOnInit() {
  }

  get color() {
    return this.colors[this.data.event_type || this.data.product.type];
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

}
