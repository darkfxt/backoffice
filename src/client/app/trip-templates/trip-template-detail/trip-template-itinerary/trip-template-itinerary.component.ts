import {Component, OnInit, Inject, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EventDialogComponent} from './event-dialog/event-dialog.component';
import {FormArray, FormBuilder} from '@angular/forms';
import {Event} from '../../../shared/models/TripTemplate';


@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss']
})
export class TripTemplateItineraryComponent implements OnInit {
  @Input()
  itinerary: FormArray;
  constructor(public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
  }

  openDialog(productType): void{
    this.itinerary.push(this.fb.group(new Event()));
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

