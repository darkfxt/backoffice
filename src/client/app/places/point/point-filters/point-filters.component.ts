import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../../../shared/services/place.service';
import {FormGroup} from '@angular/forms';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {FilterPoints} from '../../../store/place/place.actions';

@Component({
  selector: 'app-point-filters',
  templateUrl: './point-filters.component.html',
  styleUrls: ['./point-filters.component.scss']
})
export class PointFiltersComponent implements OnInit {
  searchString: string;
  pointSearchForm: FormGroup;

  constructor(private PlaceServiceInstance: PlaceService,
              private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSearch(event) {
    this.store.dispatch(new FilterPoints(`q=${event}`));
  }

}
