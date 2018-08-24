import {Component, Input, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {Event, eventType} from '../../../../shared/models/TripTemplate';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {OrdinalDayForEventSetted, OrdinalForEventSetted, DayIndexTypeForEventSetted} from '../../../../store/trip-template/trip-template.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  animations: [
    trigger('addEventState', [
      state('out', style({transform: 'translateX(-100%)'})),
      state('in', style({transform: 'translateX(0)'})),
      state('add-in', style({transform: 'rotate(45deg)'})),
      state('add-out', style({transform: 'rotate(0deg)'})),
      transition('add-in <=> add-out', animate('100ms ease-in')),
      transition('out => in', [
        animate('0.6s', keyframes([
          style({transform: 'translateX(-100%)', offset: 0}),
          style({transform: 'translateX(20px)',  offset: 0.5}),
          style({transform: 'translateX(-20px)',  offset: 0.7}),
          style({transform: 'translateX(0)',     offset: 1.0}),
        ]))
      ])
    ])
  ]
})
export class AddEventComponent implements OnInit {

  @Input() ordinal;
  @Input() day: number;

  state = 'out';
  tooltipMessage = {'in': 'close', 'out': 'Add event here'};
  productTypes = [
    {value: eventType.DRIVING,/* 'DRIVING', */viewValue: 'driving', icon:'driving'},
    {value: eventType.HOTEL, viewValue: 'hotel', icon:'hotel'},
    {value: eventType.ACTIVITY, viewValue: 'activity', icon:'ticket'},
    {value: eventType.OTHER, viewValue: 'other', icon:'edit_2'}
  ];

  constructor(public dialog: MatDialog, private store: Store<AppState>, private router: Router) { }

  ngOnInit() {

  }

  showOptions(): void{
    this.state = this.state === 'out'? 'in': 'out';
  }

  openDialog(productType){
    this.store.dispatch(new DayIndexTypeForEventSetted(this.day, this.ordinal, productType ));
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
    this.router.navigate([{ outlets: { modal: ['modal_route_new'] } }]);

    dialogRef.afterClosed().subscribe(result => {
      this.state = 'out';
    });
  }

}
