import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ListItemComponent } from './common-list-item/common-list-item.component';
import { PageEvent } from '@angular/material';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { PaginationOptionsInterface } from './common-list-item/pagination-options.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/shared/app.interfaces';
import { selectLoaderEntity } from '../../store/shared/reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {first} from 'rxjs/internal/operators';

const ALLOWED_PAGE_SIZE = [5, 10, 25, 50];

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.scss']
})
export class CommonListComponent implements OnInit {
  // @Input() list: Observable<any>;
  @Input() list: any;
  @Input() component: ListItemComponent;
  @Input() totalElements: number;
  @Input() paginationMetadata: any;
  @Input() storeToWatch: string;
  @Input() filterComponent: any;
  @Input() hideFilter = false;
  @Input() hidePagination = false;
  @Input() activateSelectionMode = false;
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  _subscription: Subscription;
  loading = false;
  queryLocation: string;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<AppState>
  ) {
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const setMetadata = {
        pageIndex: +this.paginationMetadata.pageIndex ,
        pageSize: +this.paginationMetadata.page_size || +(!params.pageSize || !ALLOWED_PAGE_SIZE.includes(params.pageSize) ? 10 : params.pageSize)
      };
      if (this.paginationMetadata.filter) {
        /*setMetadata['search'] = this.paginationMetadata.filter.search_name ?
          this.paginationMetadata.filter.search_name : params.search;*/
        if (this.paginationMetadata.filter.type)
          setMetadata['types'] = this.paginationMetadata.filter.type || params.types.split(',');
        else
          setMetadata['search'] = this.paginationMetadata.filter.search_name || params.search;
      }
      this.paginationMetadata = Object.assign({}, this.paginationMetadata, setMetadata);
      this.queryBuilder(this.paginationMetadata);
    });

  }

  changePage(event) {
    this.paginationMetadata = Object.assign(
      {},
      this.paginationMetadata,
      {pageSize: this.paginationMetadata.page_size, pageIndex: event.pageIndex});
    this.queryBuilder(this.paginationMetadata);
    this.pageChanged.emit(this.paginationMetadata);
  }

  queryBuilder(pageOp: any) {
    const actualQuery = this.location.normalize(this.location.path()).split('?');
    this.queryLocation = `${actualQuery[0]}?pageIndex=${pageOp.pageIndex}&pageSize=${pageOp.pageSize}`;
    if (pageOp.filter.search_name) this.queryLocation += `&search=${pageOp.filter.search_name}`;
    if (pageOp.filter.type) this.queryLocation += `&types=${pageOp.filter.type}`;
    this.location.replaceState(this.queryLocation);
  }

  parseQuery(pageOp: any) {
    const actualQueryParams = this.location.normalize(this.location.path()).split('?')[1];

  }

  resetFilters() {
    const actualQuery = this.location.normalize(this.location.path()).split('?');
    this.queryLocation = `${actualQuery[0]}?pageIndex=0&pageSize=10`;
    this.location.replaceState(this.queryLocation);
  }

}
