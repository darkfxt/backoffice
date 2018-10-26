import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationOptionsInterface } from '../shared/common-list/common-list-item/pagination-options.interface';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RouteSummarizedCardComponent } from './route-summarized-card/route-summarized-card.component';
import { RoutesService } from '../shared/services/routes.service';
import { GetSegments } from '../store/route/route.actions';
import {default as Segment, SegmentWithMetadata} from '../shared/models/Segment';
import Route from '../../../server/api/entity/Route';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../store/shared/app.interfaces';
import { getAllSegments, getSegmentsMetadata } from '../store/route';
import { selectLoaderEntity } from '../store/shared/reducers';

@Component({
  selector: 'app-tg-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit, OnDestroy {
  @Input() selectMode ? = false;
  @Input() isDialog ? = 'false';
  popup = false;
  @Input() dialogRef: any;
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  loading$: Observable<boolean>;
  routes: any;
  routes$: Observable<Segment[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: PaginationOptionsInterface;
  _subscription: Subscription;

  constructor(private SegmentServiceInstance: RoutesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.routes$ = this.store.pipe(select(getAllSegments));
    this.metadata$ = this.store.pipe(select(getSegmentsMetadata));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( RouteSummarizedCardComponent );
  }

  ngOnInit() {
    this.popup = this.isDialog !== 'false';
    this.paginationOptions = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.store.dispatch(new GetSegments(this.paginationOptions));
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
    if (this.popup) {
      if (this.dialogRef) {
        this.dialogRef.close('OPEN_NEW_ROUTES');
      }
      return;
    }
    this.router.navigate(['/routes/new']);
  }

  goBack() {
    if (this.popup) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      this.router.navigate(['/routes']);
  }

}
