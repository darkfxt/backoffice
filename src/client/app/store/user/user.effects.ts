import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/internal/operators';

import { GetUsers, RetrievedUsersSuccess, SaveUserSuccess,
  UserActionTypes, UserSelected, UserSignedIn, SignInUser } from './user.actions';
import {LoginServerResponse, User} from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import {
  GetTripTemplates,
  TripTemplateActionTypes,
  TripTemplatesRetrieved
} from '../trip-template/trip-template.actions';
import { TripTemplateWithMetadata } from '../../shared/models/TripTemplate';
import {AuthService} from '../../shared/services/auth.service';

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
      switchMap((userData: SignInUser) => this.authenticationServiceInstance.login(
        userData.payload.email, userData.payload.password)),
      map((serverResponse: LoginServerResponse) => new UserSignedIn(serverResponse))
    );
}
