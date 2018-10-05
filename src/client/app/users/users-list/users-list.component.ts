import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItemComponent } from '../../shared/common-list/common-list-item/common-list-item.component';
import { User } from '../../shared/models/User';
import { UserSummarizedCardComponent } from './user-summarized-card/user-summarized-card.component';
import {Observable, Subscription} from 'rxjs';
import {AppState, segmentSelector, userSelector} from '../../store';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import {GetUsers} from '../../store/user/user.actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Output() selectedUser: EventEmitter<User> = new EventEmitter<User>();

  users$: Observable<User[]>;
  loading = false;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface = new PaginationOptions();
  _subscription: Subscription;
  constructor(private UserServiceInstance: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.drawingComponent = new ListItemComponent( UserSummarizedCardComponent );
    this.users$ = this.store.select(userSelector);
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers());
    this._subscription = this.store.select(userSelector).subscribe((data: any) => {
      this.paginationOptions = data.metadata;
      this.loading = data.loading;
      console.log('**********************');
      console.log(data);
    });
  }

}
