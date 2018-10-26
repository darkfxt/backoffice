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
import { PaginationOptionsInterface } from '../shared/common-list/common-list-item/pagination-options.interface';
import Route from '../../../server/api/entity/Route';
import { AppState } from '../store/shared/app.interfaces';
import { getPointsMetadata, getAllPoints } from '../store/place';
import { isLoaderShowing, selectLoaderEntity } from '../store/shared/reducers';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnDestroy {
  @Input() selectMode ? = false;
  @Input() isDialog ? = 'false';
  dialog: boolean;
  @Input() dialogRef: any;
  @Input() drivingUpdate?: any;
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  points$: Observable<Point[]>;
  metadata$: Observable<PaginationOptionsInterface>;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface;
  _subscription: Subscription;

  constructor(private placesServiceInstance: PlaceService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.points$ = this.store.pipe(select(getAllPoints));
    this.metadata$ = this.store.pipe(select(getPointsMetadata));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( PointSummarizedCardComponent );
  }

  ngOnInit() {
    this.dialog = this.isDialog !== 'false';
    this.paginationOptions = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.store.dispatch(new GetPoints(this.paginationOptions));
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetPoints(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, {search: event});
    this.store.dispatch(new   GetPoints(this.paginationOptions));
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

}
