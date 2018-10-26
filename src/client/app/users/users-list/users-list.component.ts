import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListItemComponent } from '../../shared/common-list/common-list-item/common-list-item.component';
import { User } from '../../shared/models/User';
import { UserSummarizedCardComponent } from './user-summarized-card/user-summarized-card.component';
import { Observable, Subscription } from 'rxjs';
// import { AppState, getSegmentsEntityState, userSelector } from '../../store';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { GetUsers } from '../../store/user/user.actions';
import { AppState } from '../../store/shared/app.interfaces';
import { getAllUsers, getUserEntities } from '../../store/user';
import { selectLoaderEntity } from '../../store/shared/reducers';

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
  metadata = new PaginationOptions();
  loading = false;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface = new PaginationOptions();
  _subscription: Subscription;
  constructor(private UserServiceInstance: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.users$ = this.store.pipe(select(getAllUsers));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( UserSummarizedCardComponent );
    // this.users$ = this.store.select(userSelector);
  }

  ngOnInit() {
    this.store.dispatch(new GetUsers());
  }

  onButtonClick() {
    if (this.isDialog) {
      if (this.dialogRef) {
        this.dialogRef.close('OPEN_NEW_USERS');
      }
      return;
    }
    this.router.navigate(['/users/new']);
  }

  goBack() {
    if (this.isDialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      this.router.navigate(['/users']);
  }

}
