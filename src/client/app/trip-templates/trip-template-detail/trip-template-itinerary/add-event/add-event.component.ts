import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition, keyframes
} from '@angular/animations';

import { iconMap, TypeOfEvent } from '../../../../shared/models/TripTemplate';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../../../store/shared/app.interfaces';
import { TRANSLATE } from '../../../../translate-marker';

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
  @Input() filterEventType = [];

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
        panelClass: 'event-bottom-sheet',
        data: {
          filterEventType: this.filterEventType
        }
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
export class BottomSheetEventComponent implements OnInit {
  productTypes = [
    {value: TRANSLATE('driving'), icon: iconMap[TypeOfEvent.DRIVING]},
    {value: TRANSLATE('place'), icon: iconMap[TypeOfEvent.POI]},
    {value: TRANSLATE('custom'), icon: iconMap[TypeOfEvent.CUSTOM]}
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetEventComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {}

  ngOnInit() {
    if (this.data.filterEventType.length)
      this.productTypes = this.productTypes.filter(item => this.data.filterEventType.indexOf(item.value) > -1);
  }

  openDialog(productType): void {
    this.bottomSheetRef.dismiss(productType);
    event.preventDefault();
  }
}
