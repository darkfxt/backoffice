import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/internal/operators';

import { UserActionTypes, UserSelected } from './user.actions';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userServiceInstance: UserService) {
  }

  @Effect()
  saveUser$ = this.actions$
    .ofType(UserActionTypes.SAVE_USER)
    .pipe(
      switchMap((query: any) => this.userServiceInstance.upsert({id: query.payload.id, body: query.payload.body})),
      map(res => ({type: 'USER_SAVED'}))
    );
}
