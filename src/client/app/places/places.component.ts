import {Component, OnInit, Type} from '@angular/core';
import {PlaceService} from '../shared/services/place.service';
import {AppState, loadingSelector, metadataSelector, pointSelector} from '../store';
import {Store} from '@ngrx/store';
import {Point} from '../shared/models/Place';
import {Observable} from 'rxjs';
import {GetPoints} from '../store/place/place.actions';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { PointSummarizedCardComponent } from './point-summarized-card/point-summarized-card.component';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material';
import {PaginationOptionsInterface} from '../shared/common-list/common-list-item/pagination-options.interface';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit{
  loading = false;
  points$: Observable<Point[]>;
  metadata$: Observable<PaginationOptionsInterface>;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface;

  constructor(private placesServiceInstance: PlaceService,
              private store: Store<AppState>){
    store.select(loadingSelector).subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.points$ = store.select(pointSelector);
    this.metadata$ = store.select(metadataSelector);
    this.drawingComponent = new ListItemComponent( PointSummarizedCardComponent );
  }

  ngOnInit() {
    this.paginationOptions = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.store.dispatch(new GetPoints(this.paginationOptions));
    this.store.select(pointSelector).subscribe((data: any) => {
      this.paginationOptions = data.metadata;
      this.loading = data.loading;
    });
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetPoints(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions,{search: event});
    this.store.dispatch(new   GetPoints(this.paginationOptions));
  }

}
