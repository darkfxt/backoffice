import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  addPlace (place): Observable<any> {
    return this.http.post('/api/places', place)
      .pipe(
        catchError(this.handleError('addPlace'))
      );
  }

  autocomplete (query: string): Observable<any>{
    return this.http.get(`/api/places/autocomplete/?q=${query}&lang=es`)
      .pipe(
        catchError(this.handleError('autocomplete'))
      );
  }

  getDetail (place_id: string): Observable<any>{
    return this.http.get(`/api/places/${place_id}?lang=es`)
      .pipe(
        catchError(this.handleError('autocomplete'))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
