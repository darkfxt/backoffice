import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Type } from '@angular/core';
import { PlaceService } from '../shared/services/place.service';
// import { AppState, loadingSelector, metadataSelector, pointSelector } from '../store';
import { select, Store } from '@ngrx/store';
import { Point } from '../shared/models/Place';
import { Observable, Subscription } from 'rxjs';
import { GetPoints } from '../store/place/place.actions';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { PointSummarizedCardComponent } from './point-summarized-card/point-summarized-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationOptionsInterface, PaginationOptions } from '../shared/common-list/common-list-item/pagination-options.interface';
import Route from '../../../server/api/entity/Route';
import { AppState } from '../store/shared/app.interfaces';
import { getPointsMetadata, getAllPoints } from '../store/place';
import { isLoaderShowing, selectLoaderEntity } from '../store/shared/reducers';

import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { first } from 'rxjs/internal/operators';

const ALLOWED_PAGE_SIZE = [5, 10, 25, 50];

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  dialog: boolean;
  @Input() dialogRef: any;
  @Input() query = {};
  @Input() drivingUpdate?: any;
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  points$: Observable<Point[]>;
  metadata$: Observable<PaginationOptionsInterface>;
  md$: Subscription;
  drawingComponent: ListItemComponent;
  paginationOptions: any = new PaginationOptions();
  _subscription: Subscription;
  totalElements: Number;
  queryLocation: string;

  constructor(private placesServiceInstance: PlaceService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private store: Store<AppState>) {
    this.points$ = this.store.pipe(select(getAllPoints));
    this.metadata$ = this.store.pipe(select(getPointsMetadata));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( PointSummarizedCardComponent );
  }

  ngOnInit() {
    this.dialog = this.isDialog;
    if (this.query) {
      this.paginationOptions = Object.assign({}, this.paginationOptions, this.query);
    }
    if (this.dialogRef && this.dialogRef.componentInstance && this.dialogRef.componentInstance.data) {
      if (this.dialogRef.componentInstance.data.method === 'UPDATE_TERMINAL') {
        if (this.dialogRef.componentInstance.data.eventToUpdate) {
          const data = this.dialogRef.componentInstance.data;
          const placeToSearch = data.eventToUpdate.product[data.terminal];
          this.paginationOptions.nearName = placeToSearch.name;
          this.paginationOptions.coordinates = `${placeToSearch.geo.point.lat},${placeToSearch.geo.point.lng}`;
          this.paginationOptions.distance = 20;
        }
      }
    }
    this.md$ = this.metadata$.subscribe(metadata => this.totalElements = metadata.length);
    this.route.queryParams.pipe(first()).subscribe((params) => {
      const setMetadata = {
        pageIndex: +(!params.pageIndex ? 0 : params.pageIndex),
        pageSize: +(!params.pageSize || !ALLOWED_PAGE_SIZE.includes(params.pageSize) ? 10 : params.pageSize)
      };
        if (params.types)
          setMetadata['types'] = params.types.split(',');
        if (params.search)
          setMetadata['search'] = params.search || '';
        if (params.coordinates)
          setMetadata['coordinates'] = params.coordinates;
      this.paginationOptions = Object.assign({}, this.paginationOptions, setMetadata);
      this.store.dispatch(new GetPoints(this.paginationOptions));
    });
    // console.log(this.location, this.query, this.paginationOptions);
    // this.queryBuilder(this.paginationOptions);
    // console.log(this.location.normalize(this.location.path()), this.query, this.paginationOptions);

  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    if (this.md$) {
      this.md$.unsubscribe();
    }
  }

  onPageChanged(event) {
     this.paginationOptions = Object.assign(
       {}, this.paginationOptions, event
     );
     // this.queryBuilder(this.paginationOptions);
    this.store.dispatch(new GetPoints(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, event);
    this.store.dispatch(new GetPoints(this.paginationOptions));
  }

  onButtonClick() {
    if (this.dialog) {
      if (this.dialogRef) {
        this.dialogRef.close('OPEN_NEW_PLACES');
      }
      return;
    }
    this.router.navigate(['/places/new']);
  }

  goBack() {
    if (this.dialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      this.router.navigate(['/places']);
  }

  private titleCase(text): string {
    const toArr: Array<string> = Array.from(text);
    const removed = toArr.splice(0,1, toArr[0].toUpperCase());
    return toArr.join('');
  }

}
