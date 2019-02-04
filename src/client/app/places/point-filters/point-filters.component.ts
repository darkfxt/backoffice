import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { PlaceService } from '../../shared/services/place.service';
import { PaginationOptionsInterface } from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, Subscription } from 'rxjs';
import { SearchOptions } from '../../shared/common-list/common-list-item/search-options';
import { TRANSLATE } from '../../translate-marker';
import { PlaceType } from '../../shared/models/enum/PlaceType';

interface IPlaceFilter {
  search: string;
  types: Array<any>;
}

@Component({
  selector: 'app-point-filters',
  templateUrl: './point-filters.component.html',
  styleUrls: ['./point-filters.component.scss']
})
export class PointFiltersComponent implements OnInit, OnDestroy {
  searchString: string;
  options: any[];
  optionsSubsription: Subscription;
  lastSearch = '';
  filterSelected = [];
  filterOptions: IPlaceFilter = {search: '', types: []};
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<IPlaceFilter> = new EventEmitter<IPlaceFilter>();

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI')},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL')},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY')},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL')},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION')},
  ];

  constructor(private placeService: PlaceService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.optionsSubsription)
      this.optionsSubsription.unsubscribe();
  }

  onSearchChanged(event) {
    this.filterOptions.search = event;
  }

  onTypeChanged(event) {
    this.filterOptions.types = event;
  }

  onFilterApply() {
    this.filterChanged.emit(this.filterOptions);
  }

  onResetFilter() {
    this.filterOptions = {search: '', types: []};
    this.filterChanged.emit(this.filterOptions);
  }

  onSearch(event) {
    if (event.code === 'Backspace' || event.target.value.length < 3 || event.target.value === this.lastSearch)
      return false;

    const searchParams: PaginationOptionsInterface = new SearchOptions(0, 10, 0, null, event.target.value);

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.optionsSubsription = this.placeService.getAll(searchParams, true).subscribe((resp) => {
        this.lastSearch = event.target.value;
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

  onSearchButton(event) {
    this.filterChanged.emit(event);
  }

  displayFn(value) {
    return value.name;
  }

}
