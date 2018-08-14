import {Component, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {Observable} from 'rxjs';
import { ListItemComponent } from './common-list-item/common-list-item.component';
import {PageEvent} from '@angular/material';
import {OuterSubscriber} from 'rxjs/internal/OuterSubscriber';
import {PaginationOptionsInterface} from './common-list-item/pagination-options.interface';

@Component({
  selector: 'app-common-list',
  templateUrl: './common-list.component.html',
  styleUrls: ['./common-list.component.scss']
})
export class CommonListComponent implements OnInit {
  @Input() list: Observable<any>;
  @Input() component: ListItemComponent;
  @Input() totalElements: number;
  @Input() paginationMetadata: PaginationOptionsInterface;
  @Input() storeToWatch: string;
  @Input() filterComponent: any;
  @Input() hideFilter = false;
  @Input() hidePagination = false;
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor() {

  }

  ngOnInit() {
    console.log('commonList', this.list);
    this.list.subscribe((storeData: any) => {
      console.log('CommonListOnSubscribe', storeData);
      if (!storeData.loading) {
        this.paginationMetadata = {
          previousPageIndex: 0,
          pageIndex: 0,
          pageSize: 10,
          length: storeData.metadata.length || 0
        };
      } else {
        this.paginationMetadata = {
          previousPageIndex: 0,
          pageIndex: 0,
          pageSize: 10,
          length: 0
        };
      }
    });

  }

  changePage(event) {
    this.pageChanged.emit(event);
  }

}

// {previousPageIndex: 0, pageIndex: 1, pageSize: 3, length: 21}
