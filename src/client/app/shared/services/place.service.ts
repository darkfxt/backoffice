import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { Point } from '../models/Place';
import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {
  }

  getAll (paginationMetadata: PaginationOptionsInterface, withoutMetadata?: boolean): Observable<any> {
    const queryParams: any = {};
    queryParams.limit = paginationMetadata.pageSize;
    queryParams.page = paginationMetadata.pageIndex;
    if (paginationMetadata.search)
      queryParams.search = paginationMetadata.search;
    if (paginationMetadata.types)
      queryParams.types = paginationMetadata.types;
    if (paginationMetadata.origin)
      queryParams.origin = paginationMetadata.origin;
    if (paginationMetadata.destination)
      queryParams.destination = paginationMetadata.destination;
    if (paginationMetadata.travelMode)
      queryParams.travel_mode = paginationMetadata.travelMode;
    if (paginationMetadata.distance)
      queryParams.distance = paginationMetadata.distance;
    if (paginationMetadata.coordinates)
      queryParams.coordinates = paginationMetadata.coordinates;
    if (paginationMetadata.nearName)
      queryParams.nearName = paginationMetadata.nearName;
    if (withoutMetadata)
      queryParams.simple = true;

    return this.http.get('/api/places', {params: queryParams});
  }

  addPlace (place): Observable<any> {
    return this.http.patch('api/places/', place);
  }

  autocomplete (query: string): Observable<any> {
    return this.http.get(`/api/places/glautocomplete/?q=${query}&lang=es`)
      .pipe(
        catchError(this.handleError('autocomplete'))
      );
  }

  getAutocompleteDetail (autocompleteOption: any): Observable<any> {
    if (autocompleteOption.type === 'public') {
      return this.http.get(`/api/places/google/${autocompleteOption.place_id}?lang=es`)
        .pipe(
          catchError(this.handleError('getGoogleDetail', []))
        );
    }
    const placeId = autocompleteOption._id || autocompleteOption.place_id;
    return this.http.get(`/api/places/${placeId}?lang=es`)
      .pipe(
        catchError(this.handleError('getDetail', []))
      );
  }

  improvedAutocomplete (query: string): Observable<any> {
    return this.http.get(`/api/places/autocomplete/?q=${query}&lang=es`)
      .pipe(
        catchError(this.handleError('autocomplete'))
      );
  }

  search (query: string): Observable<any> {
    return this.http.get(`/api/places/search/?${query}&lang=es`);

  }

  getGoogleDetail (place_id: string): Observable<any> {
    return this.http.get(`/api/places/google/${place_id}?lang=es`)
      .pipe(
        catchError(this.handleError('getGoogleDetail', []))
      );
  }

  upsert (params): Observable<any> {
    if (params.id && params.id !== '') {
      return this.http.patch(`/api/places/${params.id}`, params.body);
    } else {
      return this.http.post('/api/places', params.body);
    }
  }

  getDetail (place_id: string, language: string = 'en'): Observable<any> {
    return this.http.get(`/api/places/${place_id}?lang=es`)
      .pipe(
        catchError(this.handleError('getDetail', []))
      );
  }

  deleteById (place_id: string): Observable<any> {
    return this.http.delete(`/api/places/${place_id}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - username of the operation that failed
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
