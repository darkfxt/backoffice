import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {Point} from '../models/Place';
import {PageEvent} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getAll (paginationMetadata: PageEvent): Observable<any> {
    let queryParams = '';
    if (paginationMetadata) {
      queryParams += `?size=${paginationMetadata.pageSize}&page=${paginationMetadata.pageIndex}`;
    }
    console.log('/api/places' + queryParams);
    return this.http.get('/api/places' + queryParams);
  }

  addPlace (place): Observable<any> {
    return this.http.patch('api/places/', place);
  }

  autocomplete (query: string): Observable<any>{
    return this.http.get(`/api/places/glautocomplete/?q=${query}&lang=es`)
      .pipe(
        catchError(this.handleError('autocomplete'))
      );
  }

  search (query: string): Observable<any>{
    console.log('estoy pasando por la busqueda', query);
    return this.http.get(`/api/places/search/?${query}&lang=es`);

  }

  getDetail (place_id: string): Observable<any>{
    return this.http.get(`/api/places/${place_id}?lang=es`)
      .pipe(
        catchError(this.handleError('getDetail', []))
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
