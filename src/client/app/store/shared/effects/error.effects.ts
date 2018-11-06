import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { HTTP_ERROR, HttpError } from '../actions/error.actions';
import { SnackbarOpen } from '../actions/snackbar.actions';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators';
import { HideLoader } from '../actions/loader.actions';

@Injectable()
export class ErrorEffects {

  @Effect()
  showError: Observable<any> = this.actions.ofType<HttpError>(HTTP_ERROR)
    .pipe(
      map((action: any) => {
        if (action.payload.status !== undefined && action.payload.status === 0) {
          return `This is embarrassing, we're having an issue.`;
        }
        return action.message; //action.payload.message;
      }),
      mergeMap((message) => [
        new SnackbarOpen({ message: message }),
        new HideLoader()
      ])
    );

  constructor(private actions: Actions) {
  }

}
