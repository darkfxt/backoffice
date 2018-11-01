import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  formHeader: FormGroup;
  formItinerary: FormGroup;
  formStatus: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formHeader = this.fb.group({});
    this.formItinerary = this.fb.group({});
    this.formStatus = this.fb.group({});
  }

  saveBooking() {

  }

  goBack() {

  }



}
