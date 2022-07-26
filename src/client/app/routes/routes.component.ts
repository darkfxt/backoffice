import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaginationOptionsInterface } from '../shared/common-list/common-list-item/pagination-options.interface';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { RouteSummarizedCardComponent } from './route-summarized-card/route-summarized-card.component';
import { RoutesService } from '../shared/services/routes.service';
import { GetSegments } from '../store/route/route.actions';
import {default as Segment, SegmentWithMetadata } from '../shared/models/Segment';
import Route from '../../../server/api/entity/Route';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../store/shared/app.interfaces';
import { getAllSegments, getSegmentsMetadata } from '../store/route';
import { selectLoaderEntity } from '../store/shared/reducers';
import { first } from 'rxjs/internal/operators';

const ALLOWED_PAGE_SIZE = [5, 10, 25, 50];

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
  @Input() query = {};
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  loading$: Observable<boolean>;
  routes: any;
  routes$: Observable<Segment[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: any;
  _subscription: Subscription;
  totalElements: Number;

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
    this.metadata$.subscribe(metadata => this.totalElements = metadata.length);
    this.paginationOptions = {...this.paginationOptions, ...this.query};
    this.route.queryParams.pipe(first()).subscribe((params) => {
      const setMetadata = {
        pageIndex: +(!params.pageIndex ? 0 : params.pageIndex),
        pageSize: +(!params.pageSize || !ALLOWED_PAGE_SIZE.includes(params.pageSize) ? 10 : params.pageSize)
      };
      if (this.paginationOptions.filter && this.paginationOptions.filter.search_name)
        setMetadata['search'] = this.paginationOptions.filter.search_name;
      else
        setMetadata['search'] = params.search;
      setMetadata['types'] = this.paginationOptions.types || params.types;
      this.paginationOptions = Object.assign({}, this.paginationOptions, setMetadata);
      //this.metadata$.subscribe(metadata => this.totalElements = metadata.length);
      this.store.dispatch(new GetSegments(this.paginationOptions));
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
    this.paginationOptions = Object.assign({}, this.paginationOptions, {search: event, pageIndex: 0, pageSize: 10});
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
