import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { LoadingModule } from '../shared/loading/loading.module';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { LogoComponent } from './account-detail/logo/logo.component';
import { UploaderModule } from '../shared/uploader/uploader.module';
import { AccountSummarizedCardComponent } from './accounts-list/account-summarized-card/account-summarized-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LoadingModule,
    TranslateModule,
    ColorPickerModule,
    UploaderModule,
    AccountsRoutingModule
  ],
  declarations: [AccountsListComponent, AccountDetailComponent, LogoComponent, AccountSummarizedCardComponent],
  exports: [AccountSummarizedCardComponent]
})
export class AccountsModule { }
