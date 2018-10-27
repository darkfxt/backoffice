import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

import {iconMap, TypeOfEvent} from '../../../../shared/models/TripTemplate';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../../store/shared/app.interfaces';
import {TRANSLATE} from '../../../../translate-marker';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  @Input() firstEvent: boolean;
  @Input() ordinal;
  @Input() day: number;
  @Input() editMode: boolean;

  @Output() openedDialog: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit() {

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

}

@Component({
  selector: 'app-bottom-sheet-event',
  template: `
    <ul>
      <li *ngFor="let productType of productTypes" (click)="openDialog(productType.value)">
        <div class="product-icon">
          <mat-icon>{{productType.icon}}</mat-icon>
        </div>
        <div class="product-label">{{productType.value | translate}}</div>
      </li>
    </ul>
  `,
  styles: [
      `.event-bottom-sheet {
      padding: 8px 0 !important;
    }`,
      `li:hover {
      background: #ccc;
    }`,
      `li {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      color: rgba(0,0,0,0.70);
      cursor: pointer;
    }`,
      `.product-icon {
      height: 40px;
      width: 40px;
      text-align: center;
      display: flex;
      cursor: pointer;
      align-items: center;
    }`,
      `.product-label {
      margin-left: 16px;
      text-transform: capitalize;
      font-size: 16px
    }`
  ]
})
export class BottomSheetEventComponent {
  productTypes = [
    {value: TRANSLATE('POI'), icon: iconMap[TypeOfEvent.POI]},
    {value: TRANSLATE('HOTEL'), icon: iconMap[TypeOfEvent.HOTEL]},
    {value: TRANSLATE('ACTIVITY'), icon: iconMap[TypeOfEvent.ACTIVITY]},
    {value: TRANSLATE('REFERENCE'), icon: iconMap[TypeOfEvent.REFERENCE]},
    {value: TRANSLATE('TERMINAL'), icon: iconMap[TypeOfEvent.TERMINAL]},
    {value: TRANSLATE('DRIVING'), icon: iconMap[TypeOfEvent.DRIVING]},
    {value: TRANSLATE('OTHER'), icon: iconMap[TypeOfEvent.OTHER]}
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetEventComponent>) {
  }

  openDialog(productType): void {
    this.bottomSheetRef.dismiss(productType);
    event.preventDefault();
  }
}
