import { Component, EventEmitter, OnInit, Output, OnDestroy, Input, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { PlaceService } from '../../shared/services/place.service';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, Subscription } from 'rxjs';
import { SearchOptions } from '../../shared/common-list/common-list-item/search-options';
import { TRANSLATE } from '../../translate-marker';
import { PlaceType } from '../../shared/models/enum/PlaceType';
import { first } from 'rxjs/internal/operators';
import { GetPoints } from '../../store/place/place.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';

interface IPlaceFilter {
  search: string;
  types: Array<any>;
}

const ALLOWED_PAGE_SIZE = [5, 10, 25, 50];

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
  acLoading = false;
  paginationOptions: any = new PaginationOptions();
  sliderValue = 20;
  sliderStatus = false;
  filterSelected = [];
  @Input() filterOptions: any = new PaginationOptions();
  private autocompleteTimeout;
  @Output() filterChanged: EventEmitter<PaginationOptions> = new EventEmitter<PaginationOptions>();

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI'), enabled: false},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL'), enabled: false},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY'), enabled: false},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL'), enabled: false},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION'), enabled: false},
  ];

  constructor(private placeService: PlaceService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2) {

  }

  ngOnInit() {
    this.pointTypes = this.pointTypes.map(ptm => {
      if (this.filterOptions.types.includes(ptm.value))
        ptm.enabled = true;
      return ptm;
    });
    this.filterOptions = Object.assign({}, this.filterOptions, {distance: this.filterOptions.distance || 20});
    if (this.filterOptions.nearName) this.sliderStatus = true;
  }

  ngOnDestroy() {
    if (this.optionsSubsription)
      this.optionsSubsription.unsubscribe();
  }

  onSearchChanged(event) {
    this.filterOptions = Object.assign({}, this.filterOptions, {search: event || ''});
    this.onFilterApply();
  }

  onTypeChanged(event) {
    this.filterOptions.types = event;
  }

  onFilterApply() {
    const filterApplied = Object.assign({},
      this.filterOptions,
      {types: this.pointTypes.filter(plt => plt.enabled).map(plt => plt.value)});
    this.filterOptions = filterApplied;
    this.filterChanged.emit(this.filterOptions);
  }

  onResetFilter() {
    this.filterOptions = new PaginationOptions();
    this.filterChanged.emit(this.filterOptions);
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

  searchPrivates(event) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch) {
      return false;
    }
    this.acLoading = true;
    // this.lastSearch[control] = event.target.value;
    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.placeService.search(`search=${event.target.value}`).subscribe(resp => {
          this.options = this.createGroups(resp);
          this.acLoading = false;
        },
        (err) => {
          this.acLoading = false;
        });
    }, 300);
  }

  onSliderChange(event) {
    this.filterOptions.distance = event.value;
    this.onFilterApply();
  }

  onChangeNearSelection(event) {
    this.filterOptions = Object.assign({},
      this.filterOptions,
      {
        coordinates: `${event.option.value.geo.point.lat},${event.option.value.geo.point.lng}`,
        nearName: event.option.value.name,
        distance: this.filterOptions.distance || 20});
    this.sliderStatus = true;
    this.onFilterApply();
  }

  onDeleteNearSelection(event) {
    if (this.filterOptions.distance) Reflect.deleteProperty(this.filterOptions, 'distance');
    if (this.filterOptions.coordinates) Reflect.deleteProperty(this.filterOptions, 'coordinates');
    if (this.filterOptions.nearName) Reflect.deleteProperty(this.filterOptions, 'nearName');
    this.sliderStatus = false;
    this.options = [];
    this.onFilterApply();
  }

}
