import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutesService } from '../../shared/services/routes.service';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { SearchOptions } from '../../shared/common-list/common-list-item/search-options';

@Component({
  selector: 'app-route-filters',
  templateUrl: './route-filters.component.html',
  styleUrls: ['./route-filters.component.scss']
})
export class RouteFiltersComponent implements OnInit {
  searchString: string;
  options: Observable<{data: any[], metadata: object}>;
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private RouteServiceInstance: RoutesService) { }

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
      this.options = this.RouteServiceInstance.getAll(searchParams, true);
    }, 300);

  }

  onEnter(event) {
    this.filterChanged.emit(event);
  }

}
