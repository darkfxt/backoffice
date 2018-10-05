import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';
import { LoadingModule } from '../shared/loading/loading.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../store/user/user.effects';
import { UserSummarizedCardComponent } from './users-list/user-summarized-card/user-summarized-card.component';
import { CommonListModule } from '../shared/common-list/common-list.module';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  imports: [
    StoreModule.forFeature('users', reducers),
    CommonModule,
    CommonListModule,
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
    UsersRoutingModule
  ],
  declarations: [UsersListComponent, UserDetailComponent, UserSummarizedCardComponent, UserLoginComponent],
  exports: [UserSummarizedCardComponent, UserLoginComponent]
})
export class UsersModule { }
