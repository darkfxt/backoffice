import { Component, OnDestroy, OnInit } from '@angular/core';
import { TripTemplate } from '../shared/models/TripTemplate';
import {Observable, Subscription} from 'rxjs';
import { ListItemComponent } from '../shared/common-list/common-list-item/common-list-item.component';
import { PaginationOptionsInterface } from '../shared/common-list/common-list-item/pagination-options.interface';
import { TripTemplateService } from '../shared/services/trip-template.service';
import {select, Store} from '@ngrx/store';
import { GetTripTemplates, TripTemplateEditionLeft } from '../store/trip-template/trip-template.actions';
import { TripTemplateSummarizedCardComponent } from './trip-template-summarized-card/trip-template-summarized-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import {AppState} from '../store/shared/app.interfaces';
import {getTripTemplatesMetadata, getAllTripTemplates} from '../store/trip-template';
import {selectLoaderEntity} from '../store/shared/reducers';

@Component({
  selector: 'app-trip-templates',
  templateUrl: './trip-templates.component.html',
  styleUrls: ['./trip-templates.component.scss']
})
export class TripTemplatesComponent implements OnInit, OnDestroy {

  loading = false;
  tripTemplates$: Observable<TripTemplate[]>;
  drawingComponent: ListItemComponent;
  metadata$: Observable<PaginationOptionsInterface>;
  paginationOptions: PaginationOptionsInterface;
  _subscription: Subscription;

  constructor(private TripTemplateServiceInstance: TripTemplateService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    // store.select(tripTemplateLoadingSelector).subscribe((isLoading) => {
    //   this.loading = isLoading;
    // });
    this.tripTemplates$ = this.store.pipe(select(getAllTripTemplates));
    this.metadata$ = this.store.pipe(select(getTripTemplatesMetadata));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
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
  }

  ngOnDestroy() {
    this.store.dispatch(new TripTemplateEditionLeft('jo'));
  }


  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetTripTemplates(this.paginationOptions));
  }

  onFilterChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, {search: event});
    this.store.dispatch(new GetTripTemplates(this.paginationOptions));
  }

  onButtonClick() {
    this.router.navigate(['/trip-templates/new']);
  }

}
