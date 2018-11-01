import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TripTemplateService } from '../../../shared/services/trip-template.service';

@Component({
  selector: 'app-booking-detail-itinerary',
  templateUrl: './booking-detail-itinerary.component.html',
  styleUrls: ['./booking-detail-itinerary.component.scss']
})
export class BookingDetailItineraryComponent implements OnInit {

  bookingItinerary: FormGroup;
  options: Observable<any>;
  private autocompleteTimeout;
  private lastSearch;
  selectedTripTemplate = null;
  confirmedTemplate = null;

  constructor(
    private tripTemplateService: TripTemplateService
  ) { }

  ngOnInit() {
    this.bookingItinerary = new FormGroup({
      templateName: new FormControl()
    });
  }

  displayFn(value) {
    return value.name;
  }

  optionSelected(event) {
    this.selectedTripTemplate = event.option.value._id;
  }

  search(event) {
    if (event.code === 'Backspace' || event.target.value.length < 3 ) {
      this.selectedTripTemplate = null;
      return false;
    }

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.lastSearch = event.target.value;
      this.options = this.tripTemplateService.autocomplete(event.target.value);
    }, 300);

  }

  addTemplate() {
    this.confirmedTemplate = this.selectedTripTemplate;
    console.log('Vas a meter el ' + this.selectedTripTemplate);
    console.log('estas seguro de lo que vas a hacer?');
  }

}
