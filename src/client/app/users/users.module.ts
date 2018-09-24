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

@NgModule({
  imports: [
    StoreModule.forFeature('users', reducers),
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
    UsersRoutingModule
  ],
  declarations: [UsersListComponent, UserDetailComponent]
})
export class UsersModule { }
