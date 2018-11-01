import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '../../store/shared/app.interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  formHeader: FormGroup;
  formItinerary: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<AppState>) {

  }

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
      if (this.formItinerary.valid) {
        const formData = new FormData();
        formData.append('data', JSON.stringify(this.formItinerary.value));
        console.log('vas a salvar esta verga', formData);
        // this.store.dispatch(new SaveBooking({body: formData}));
      }
    } else
      Object.keys(this.formHeader.controls).forEach(field => {
        const control = this.formHeader.get(field);
        control.markAsTouched({onlySelf: true});
      });
  }

  goBack() {
    this.router.navigate(['/booking']);
  }

  updateItinerary(event) {
    this.formItinerary = event;
  }

  prepareToSave(): FormData {
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.formItinerary.value));
    return formData;
  }

}
