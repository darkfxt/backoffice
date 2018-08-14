import { Component, OnInit } from '@angular/core';
import {TripTemplate} from '../shared/models/TripTemplate';
import {Observable} from 'rxjs';
import {ListItemComponent} from '../shared/common-list/common-list-item/common-list-item.component';
import {PaginationOptionsInterface} from '../shared/common-list/common-list-item/pagination-options.interface';
import {TripTemplateService} from '../shared/services/trip-template.service';
import {Store} from '@ngrx/store';
import {
  AppState,
  tripTemplateLoadingSelector,
  tripTemplateMetadataSelector,
  tripTemplateSelector
} from '../store';
import {GetTripTemplates} from '../store/trip-template/trip-template.actions';
import {TripTemplateSummarizedCardComponent} from './trip-template-summarized-card/trip-template-summarized-card.component';

@Component({
  selector: 'app-trip-templates',
  templateUrl: './trip-templates.component.html',
  styleUrls: ['./trip-templates.component.scss']
})
export class TripTemplatesComponent implements OnInit {

  loading = false;
  tripTemplates$: Observable<TripTemplate[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: PaginationOptionsInterface;

  constructor(private TripTemplateServiceInstance: TripTemplateService,
              private store: Store<AppState>) {
    store.select(tripTemplateLoadingSelector).subscribe((isLoading) => {
      this.loading = isLoading;
    });
    this.tripTemplates$ = store.select(tripTemplateSelector);
    this.metadata$ = store.select(tripTemplateMetadataSelector);
    this.drawingComponent = new ListItemComponent(TripTemplateSummarizedCardComponent);
  }

  ngOnInit() {
    this.paginationOptions = {
      previousPageIndex: 0,
      pageIndex: 0,
      pageSize: 10,
      length: 0
    };
    this.store.dispatch(new GetTripTemplates(this.paginationOptions));
    this.store.select(tripTemplateSelector).subscribe((data: any) => {
      this.paginationOptions = data.metadata;
      this.loading = data.loading;
    });
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetTripTemplates(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions,{search: event});
    this.store.dispatch(new GetTripTemplates(this.paginationOptions));
  }

}
