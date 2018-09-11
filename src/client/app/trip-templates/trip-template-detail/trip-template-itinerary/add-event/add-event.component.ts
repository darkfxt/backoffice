import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

import {EventDialogComponent} from '../event-dialog/event-dialog.component';
import {Event, eventType} from '../../../../shared/models/TripTemplate';
import {MatBottomSheet, MatBottomSheetRef, MatDialog} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store';
import {SetNameForTemplate, OrdinalForEventSetted, DayIndexTypeForEventSetted} from '../../../../store/trip-template/trip-template.actions';
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
  @Input() firstEvent: boolean;
  @Input() ordinal;
  @Input() day: number;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  state = 'out';
  tooltipMessage = {'in': 'close', 'out': 'Add event here'};

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    if (this.firstEvent)
      this.showOptions();
  }

  showOptions(): void {
    setTimeout(() => {
      const bottomSheetRef = this.bottomSheet.open(BottomSheetEventComponent, {
        panelClass: 'event-bottom-sheet'
      });

      bottomSheetRef.afterDismissed().subscribe((result) => {
        this.openedDialog.emit({productType: result, day: this.day, ordinal: this.ordinal});
      });
    }, 100);
  }

  /*showOptions(): void{
    this.state = this.state === 'out' ? 'in' : 'out';
  }*/



}

@Component({
  selector: 'app-bottom-sheet-event',
  template: `
    <ul>
      <li *ngFor="let productType of productTypes" (click)="openDialog(productType.value)">
        <div class="product-icon">
          <mat-icon fontSet="tg">{{productType.icon}}</mat-icon>
        </div>
        <div class="product-label">{{productType.viewValue}}</div>
      </li>
    </ul>
  `,
  styles: [
    `.event-bottom-sheet{ padding: 8px 0 !important;}`,
    `.event-bottom-sheet:hover{ background: #ccc;}`,
    `li {display: flex; align-items: center; padding: 8px 16px}`,
    `.product-icon{ height: 40px;
      width: 40px;
      font-size: 24px;
      text-align: center;
      display: flex;
      align-items: center;}`,
    `.product-label{ margin-left: 16px; text-transform: capitalize; font-size: 16px}`
  ]
})
export class BottomSheetEventComponent {
  productTypes = [
    {value: eventType.DRIVING, viewValue: 'driving', icon:'driving'},
    {value: eventType.HOTEL, viewValue: 'hotel', icon:'hotel'},
    {value: eventType.ACTIVITY, viewValue: 'activity', icon:'ticket'},
    {value: eventType.OTHER, viewValue: 'other', icon:'edit_2'}
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetEventComponent>) {}

  openDialog(productType): void {
    this.bottomSheetRef.dismiss(productType);
    event.preventDefault();
  }
}
