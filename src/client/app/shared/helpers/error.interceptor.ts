import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../store/shared/app.interfaces';
import { Store } from '@ngrx/store';
import { HideLoader } from '../../store/shared/actions/loader.actions';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthService,
      private router: Router,
      private store: Store<AppState>
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          switch (err.status) {
            case 401:
              if (err.error && err.error.code === 401) {
                const APIError = err.error;
                if (APIError.response.message === 'incorrect Username or Password') {
                  this.store.dispatch(new SnackbarOpen(
                    {message: 'Usuario o contraseña incorrectos', action: 'Error'}
                  ));
                  this.router.navigate(['/users/login']);
                }
                if (APIError.response.message === 'Token is expired') {
                  this.authenticationService.refreshToken();
                  location.reload(true);
                }
              }
              // auto logout if 401 response returned from api
              this.authenticationService.logout();
              location.reload(true);
              break;
            case 403:
              this.router.navigate(['/error', {message: err.error, code: err.status}]);
              break;
            case 404:
              this.store.dispatch(new SnackbarOpen(
                {message: 'Not found'}
              ));
              break;
            case 409:
              const message = (err.error.response && err.error.response.message) ? err.error.response.message : 'Duplicado';
              this.store.dispatch(new SnackbarOpen(
                {message: message}
              ));
              break;
            default:
              this.store.dispatch(new SnackbarOpen(
                {message: 'Error inesperado'}
              ));
              // this.router.navigate(['/error', {message: 'Error inesperado', code: err.status}]);
          }

          this.store.dispatch(new HideLoader());
          return of(err);
        }));
    }
}
