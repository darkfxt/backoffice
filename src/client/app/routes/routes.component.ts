import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationOptionsInterface} from '../shared/common-list/common-list-item/pagination-options.interface';
import {ListItemComponent} from '../shared/common-list/common-list-item/common-list-item.component';
import {Observable} from 'rxjs';
import {AppState, segmentLoadingSelector, segmentMetadataSelector, segmentSelector} from '../store';
import {Store} from '@ngrx/store';
import {RouteSummarizedCardComponent} from './route-summarized-card/route-summarized-card.component';
import {RoutesService} from '../shared/services/routes.service';
import {GetSegments} from '../store/route/route.actions';
import Segment from '../shared/models/Segment';
import Route from '../../../server/api/entity/Route';
import {PageEvent} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tg-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  @Input() selectMode? = false;
  @Input() isDialog = false;
  @Output() selectedRoute: EventEmitter<Route> = new EventEmitter<Route>();

  loading = false;
  routes$: Observable<Segment[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: PaginationOptionsInterface;

  constructor(private SegmentServiceInstance: RoutesService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>){
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
    this.store.select(segmentSelector).subscribe((data: any) => {
      this.paginationOptions = data.metadata;
      this.loading = data.loading;
    });
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetSegments(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions,{search: event});
    this.store.dispatch(new GetSegments(this.paginationOptions));
  }

  onButtonClick(){
    if (this.isDialog){
      this.router.navigate([{ outlets: { modal: ['modal_route_new'] } }]);
      return;
    }
    this.router.navigate(['/routes/new']);
  }

}
