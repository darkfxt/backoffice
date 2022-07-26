import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TypeOfEvent } from '../../../../shared/models/TripTemplate';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent implements OnInit {

  eventGroup: FormGroup;

  eventTypes = [
    {value: 'driving', viewValue: 'Driving'},
    {value: 'custom', viewValue: 'Other'}
  ];

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onButtonClick() {
    // this.router.navigate(['/trip-templates/new']);
  }


}
