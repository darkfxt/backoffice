import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PlaceService} from '../../../shared/services/place.service';
import {FormGroup} from '@angular/forms';
import {AppState, metadataSelector} from '../../../store';
import {Store} from '@ngrx/store';
import {FilterPoints} from '../../../store/place/place.actions';
import {PaginationOptionsInterface} from '../../../shared/common-list/common-list-item/pagination-options.interface';

@Component({
  selector: 'app-point-filters',
  templateUrl: './point-filters.component.html',
  styleUrls: ['./point-filters.component.scss']
})
export class PointFiltersComponent implements OnInit {
  searchString: string;
  paginationMetadata: PaginationOptionsInterface;

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }

  onSearch(event) {
    this.filterChanged.emit(event);
  }

}
