import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlaceService} from '../../shared/services/place.service';
import {PaginationOptionsInterface} from '../../shared/common-list/common-list-item/pagination-options.interface';
import {Observable} from 'rxjs';
import {SearchOptions} from '../../shared/common-list/common-list-item/search-options';

@Component({
  selector: 'app-point-filters',
  templateUrl: './point-filters.component.html',
  styleUrls: ['./point-filters.component.scss']
})
export class PointFiltersComponent implements OnInit {
  searchString: string;
  options: Observable<{data: any[], metadata: object}>;
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private placeService: PlaceService) {

  }

  ngOnInit() {

  }

  onOptionSelected(event) {
    this.searchString = event.option.value.name;
    this.filterChanged.emit(event.option.value.name);
  }

  onSearch(event) {
    if (this.searchString.length < 3){
      return false;
    }

    const searchParams: PaginationOptionsInterface = new SearchOptions(0, 10, 0, null, event);

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.options = this.placeService.getAll(searchParams, true);
    }, 300);

  }

  onEnter(event) {
    this.filterChanged.emit(event);
  }

}
