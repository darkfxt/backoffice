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
import { ApiError } from '../models/ApiError';
import { ErrorSavingSegment } from '../../store/route/route.actions';
import {TRANSLATE} from '../../translate-marker';
import {TranslateService} from '@ngx-translate/core';

const ERROR_ROUTE_NAME_REGEX = /^.*Place with name.*and via.*already exist.$/g;
const ERROR_PLACE_ID_CONFLICT = /^.*Place with input request place_id.*and company_id.*already exist/g;
const ERROR_PLACE_CONFLICT = /^.*Place with input request place_id.*company_id.*, name =.*and type =.*already exist/g;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthService,
      private router: Router,
      private store: Store<AppState>,
      private ts: TranslateService
      ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

          switch (err.status) {
            case 400:
              if (err.error && err.error.code === 400) {
                const APIError: ApiError = err.error;
                if (ERROR_ROUTE_NAME_REGEX.test(APIError.response.message)) {
                  this.store.dispatch(new SnackbarOpen(
                    {message: this.ts.instant(TRANSLATE('Ya existe una ruta con ese nombre y vía. Por favor, modificar via.')), action: 'Error'}
                  ));
                  this.store.dispatch(new ErrorSavingSegment(APIError));
                }
                if (ERROR_PLACE_ID_CONFLICT.test(APIError.response.message)) {
                  this.store.dispatch(new SnackbarOpen(
                    {message: this.ts.instant(TRANSLATE('Ya existe un lugar para estas coordenadas en esta compañía.')), action: 'Error'}
                  ));
                }
                if (ERROR_PLACE_CONFLICT.test(APIError.response.message)) {
                  this.store.dispatch(new SnackbarOpen(
                    {message: this.ts.instant(TRANSLATE('Ya existe un lugar similar al que estás creando en esta compañía.')), action: 'Error'}
                  ));
                }
              }
              break;
            case 401:
              if (err.error && err.error.code === 401) {
                const APIError = err.error;
                if (APIError.response.message === 'incorrect Username or Password') {
                  this.store.dispatch(new SnackbarOpen(
                    {message: this.ts.instant(TRANSLATE('Usuario o contraseña incorrectos')), action: 'Error'}
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
                {message: this.ts.instant(TRANSLATE('Error inesperado'))}
              ));
              // this.router.navigate(['/error', {message: 'Error inesperado', code: err.status}]);
          }

          this.store.dispatch(new HideLoader());
          return of(err);
        }));
    }
}
