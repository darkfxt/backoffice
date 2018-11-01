import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TripTemplateService } from '../../../shared/services/trip-template.service';

@Component({
  selector: 'app-booking-detail-itinerary',
  templateUrl: './booking-detail-itinerary.component.html',
  styleUrls: ['./booking-detail-itinerary.component.scss']
})
export class BookingDetailItineraryComponent implements OnInit {

  @Input() formItinerary: FormGroup;
  options: Observable<any>;
  private autocompleteTimeout;
  private lastSearch;
  selectedTripTemplate = null;
  confirmedTemplate = null;

  @Output() templateUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private tripTemplateService: TripTemplateService
  ) { }

  ngOnInit() {

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

  onTemplateUpdated(event) {
    console.log('estás a punto de meterte en algo groso', event);
    this.templateUpdated.emit(event);
  }

}
