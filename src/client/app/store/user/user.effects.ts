import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/internal/operators';

import {
  GetUsers, RetrievedUsersSuccess, SaveUserSuccess,
  UserActionTypes, UserSelected, UserSignedIn, SignInUser, SignOutUser, UserSignedOut
} from './user.actions';
import { LoginServerResponse, User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {
  GetTripTemplates,
  TripTemplateActionTypes,
  TripTemplatesRetrieved
} from '../trip-template/trip-template.actions';
import { TripTemplateWithMetadata } from '../../shared/models/TripTemplate';
import { AuthService } from '../../shared/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userServiceInstance: UserService,
              private authenticationServiceInstance: AuthService) {
  }

  @Effect()
  saveUser$ = this.actions$
    .ofType(UserActionTypes.SAVE_USER)
    .pipe(
      switchMap((query: any) => this.userServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      map(res => new SaveUserSuccess())
    );

  @Effect()
  getAllUsers$ = this.actions$
    .ofType(UserActionTypes.GET_USERS)
    .pipe(
      switchMap((query: GetUsers) => this.userServiceInstance.getAll(query.payload)),
      map((users: User[]) => new RetrievedUsersSuccess(users))
    );

  @Effect()
  signinUser$ = this.actions$
    .ofType(UserActionTypes.SIGNIN_USER)
    .pipe(
      switchMap((userData: SignInUser) => {
        return this.authenticationServiceInstance.login(userData.payload.email, userData.payload.password);
      }),
      map((serverResponse: LoginServerResponse) => {
        return new UserSignedIn(serverResponse);
      })
    );

  @Effect()
  signoutUser$ = this.actions$
    .ofType(UserActionTypes.SIGNOUT_USER)
    .pipe(
      switchMap((userData: SignOutUser) => {
        this.authenticationServiceInstance.logout();
        return of(null);
      }),
      map(() => new UserSignedOut())
    );
}
