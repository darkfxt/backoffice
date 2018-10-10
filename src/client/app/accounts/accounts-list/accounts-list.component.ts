import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  PaginationOptions,
  PaginationOptionsInterface
} from '../../shared/common-list/common-list-item/pagination-options.interface';
import { Observable, Subscription } from 'rxjs';
import { ListItemComponent } from '../../shared/common-list/common-list-item/common-list-item.component';
import { ActivatedRoute, Router } from '@angular/router';
import {select, Store} from '@ngrx/store';
// import { accountSelector, AppState } from '../../store';
import { AccountsService } from '../../shared/services/accounts.service';
import { GetAccounts } from '../../store/account/account.actions';
import { AccountSummarizedCardComponent } from './account-summarized-card/account-summarized-card.component';
import { Account } from '../../shared/models/Account';
import { AppState } from '../../store/shared/app.interfaces';
import {getAccountEntity, getAllAccounts} from '../../store/account';
import {selectLoaderEntity} from '../../store/shared/reducers';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  @Input() selectMode ? = false;
  @Input() isDialog ? = false;
  @Input() dialogRef: any;
  @Output() selectedAccount: EventEmitter<Account> = new EventEmitter<Account>();

  accounts$: Observable<Account[]>;
  loading = false;
  drawingComponent: ListItemComponent;
  paginationOptions: PaginationOptionsInterface = new PaginationOptions();
  _subscription: Subscription;

  constructor(private AccountServiceInstance: AccountsService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) {
    this.accounts$ = this.store.pipe(select(getAllAccounts));
    this._subscription = this.store.select(selectLoaderEntity).subscribe(loader => this.loading = loader.show);
    this.drawingComponent = new ListItemComponent( AccountSummarizedCardComponent );
    // this.accounts$ = this.store.select(accountSelector);
  }

  ngOnInit() {
    this.store.dispatch(new GetAccounts());
    // this._subscription = this.store.select(getAccountEntity).subscribe((data: any) => {
    //   // this.paginationOptions = data.metadata;
    //   // this.loading = data.loading;
    //   console.log('**********************');
    //   console.log(data);
    // });
  }

  onPageChanged(event) {
    this.paginationOptions = Object.assign({}, this.paginationOptions, event);
    this.store.dispatch(new GetAccounts(this.paginationOptions));
  }

  onButtonClick() {
    if (this.isDialog) {
      if (this.dialogRef) {
        this.dialogRef.close('OPEN_NEW_ACCOUNT');
      }
      return;
    }
    this.router.navigate(['/accounts/new']);
  }

  goBack() {
    if (this.isDialog) {
      if (this.dialogRef)
        this.dialogRef.close('CLOSE');
      return;
    } else
      this.router.navigate(['/accounts']);
  }

}
