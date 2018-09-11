import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationOptionsInterface } from '../shared/common-list/common-list-item/pagination-options.interface';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { Observable, Subscription } from 'rxjs';
import { AppState, segmentLoadingSelector, segmentMetadataSelector, segmentSelector } from '../store';
import { Store } from '@ngrx/store';
import { RouteSummarizedCardComponent } from './route-summarized-card/route-summarized-card.component';
import { RoutesService } from '../shared/services/routes.service';
import { GetSegments } from '../store/route/route.actions';
import Segment from '../shared/models/Segment';
import Route from '../../../server/api/entity/Route';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tg-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  routes$: Observable<Segment[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: PaginationOptionsInterface;
  _subscription: Subscription;

  constructor(private SegmentServiceInstance: RoutesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    store.select(segmentLoadingSelector).subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.routes$ = store.select(segmentSelector);
    this.metadata$ = store.select(segmentMetadataSelector);
    this.drawingComponent = new ListItemComponent( RouteSummarizedCardComponent );
  }

  ngOnInit() {
    this.paginationOptions = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.store.dispatch(new GetSegments(this.paginationOptions));
    this._subscription = this.store.select(segmentSelector).subscribe((data: any) => {
      this.paginationOptions = data.metadata;
      this.loading = data.loading;
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetSegments(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, {search: event});
    this.store.dispatch(new GetSegments(this.paginationOptions));
  }

  onButtonClick() {
    if (this.isDialog) {
      if (this.dialogRef) {
        this.dialogRef.close('OPEN_NEW_ROUTES');
      }
      return;
    }
    this.router.navigate(['/routes/new']);
  }

  goBack() {
    if (this.isDialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      this.router.navigate(['/routes']);
  }

}
