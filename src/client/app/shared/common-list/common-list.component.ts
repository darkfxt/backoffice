import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { ListItemComponent } from './common-list-item/common-list-item.component';
import { PageEvent } from '@angular/material';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';
import { PaginationOptionsInterface } from './common-list-item/pagination-options.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/shared/app.interfaces';
import {selectLoaderEntity} from '../../store/shared/reducers';

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
  @Input() paginationMetadata: PaginationOptionsInterface;
  @Input() storeToWatch: string;
  @Input() filterComponent: any;
  @Input() hideFilter = false;
  @Input() hidePagination = false;
  @Input() activateSelectionMode = false;
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  _subscription: Subscription;
  loading = false;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private store: Store<AppState>) {
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
  }

  ngOnInit() {
  }

  changePage(event) {
    Object.assign({}, this.paginationMetadata, event);
    this.pageChanged.emit(event);
  }

}
