import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchOptions } from '../../shared/common-list/common-list-item/search-options';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { BookingService } from '../../shared/services/booking.service';

@Component({
  selector: 'app-booking-filters',
  templateUrl: './booking-filters.component.html',
  styleUrls: ['./booking-filters.component.scss']
})
export class BookingFiltersComponent implements OnInit {

  searchString: string;
  options: Observable<{data: any[], metadata: object}>;
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private bs: BookingService) { }

  ngOnInit() {
  }

  onOptionSelected(event) {
    this.searchString = event.option.value.name;
    this.filterChanged.emit(event.option.value.search_name);
  }

  onSearch(event) {
    if (this.searchString.length < 3) {
      return false;
    }

    const searchParams: PaginationOptionsInterface = new SearchOptions(0, 10, 0, null, event);

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.options = this.bs.getAll(searchParams, true);
    }, 300);

  }

  onEnter(event) {
    this.filterChanged.emit(event);
  }

}
