import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog} from '@angular/material';
import {EventDialogComponent} from './event-dialog/event-dialog.component';


@Component({
  selector: 'app-trip-template-itinerary',
  templateUrl: './trip-template-itinerary.component.html',
  styleUrls: ['./trip-template-itinerary.component.scss']
})
export class TripTemplateItineraryComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

