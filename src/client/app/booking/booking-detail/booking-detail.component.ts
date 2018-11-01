import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  formHeader: FormGroup;
  formItinerary: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formHeader = this.fb.group({
      booking_name: ['', Validators.required],
      client_id: ['', Validators.required],
      passenger_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      comment: '',
      device_id: '',
      pickup_point: '',
      dropoff_point: ''
    });
    this.formItinerary = this.fb.group({

    });
  }

  saveBooking() {
    if (this.formHeader.valid) {
    } else
      Object.keys(this.formHeader.controls).forEach(field => {
        const control = this.formHeader.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  goBack() {

  }



}
