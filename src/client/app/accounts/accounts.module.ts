import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule} from '@angular/material';
import { LoadingModule } from '../shared/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { LogoComponent } from './account-detail/logo/logo.component';
import { UploaderModule } from '../shared/uploader/uploader.module';
import { AccountSummarizedCardComponent } from './accounts-list/account-summarized-card/account-summarized-card.component';
import { CommonListModule } from '../shared/common-list/common-list.module';

@NgModule({
  imports: [
    // StoreModule.forFeature('accounts', reducers),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LoadingModule,
    TranslateModule,
    ColorPickerModule,
    UploaderModule,
    AccountsRoutingModule,
    MatMenuModule
  ],
  declarations: [AccountsListComponent, AccountDetailComponent, LogoComponent, AccountSummarizedCardComponent],
  exports: [AccountSummarizedCardComponent]
})
export class AccountsModule { }
