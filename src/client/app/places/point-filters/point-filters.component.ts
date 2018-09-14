import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { PlaceService } from '../../shared/services/place.service';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, Subscription } from 'rxjs';
import { SearchOptions } from '../../shared/common-list/common-list-item/search-options';

@Component({
  selector: 'app-point-filters',
  templateUrl: './point-filters.component.html',
  styleUrls: ['./point-filters.component.scss']
})
export class PointFiltersComponent implements OnInit, OnDestroy {
  searchString: string;
  options: any[];
  optionsSubsription: Subscription;
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private placeService: PlaceService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.optionsSubsription)
      this.optionsSubsription.unsubscribe();
  }

  onOptionSelected(event) {
    this.searchString = event.option.value.name;
    this.filterChanged.emit(event.option.value.name);
  }

  onSearch(event) {
    if (this.searchString.length < 3) {
      return false;
    }

    const searchParams: PaginationOptionsInterface = new SearchOptions(0, 10, 0, null, event);

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.optionsSubsription = this.placeService.getAll(searchParams, true).subscribe((resp) => {
        this.options = this.createGroups(resp);
      });
    }, 300);

  }

  private createGroups(list: any[]): any[] {
    const pointsByType = {};
    list.forEach((item) => {
      pointsByType[item.type] = pointsByType[item.type] || [];
      pointsByType[item.type].push(item);
    });
    return Object.keys(pointsByType).map(key => ({type: key, points: pointsByType[key]}));
  }

  onEnter(event) {
    this.filterChanged.emit(event);
  }

}
