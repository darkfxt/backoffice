import {Component, Input, OnInit} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {Event} from '../../../../shared/models/TripTemplate';
import {MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {OrdinalForEventSetted} from '../../../../store/trip-template/trip-template.actions';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
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
export class AddEventComponent implements OnInit {

  @Input() ordinal;

  state = 'out';
  addEventText = {'in': 'close', 'out': 'add'};
  productTypes = [
    {value: 'DRIVING', viewValue: 'driving'},
    {value: 'HOTEL', viewValue: 'hotel'},
    {value: 'ACTIVITY', viewValue: 'activity'},
    {value: 'OTHER', viewValue: 'other'}
  ];

  constructor(public dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit() {
  }

  showOptions(): void{
    this.state = this.state === 'out'? 'in': 'out';
  }

  openDialog(productType){
    this.store.dispatch(new OrdinalForEventSetted(this.ordinal));
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
