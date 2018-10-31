import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

@Injectable({
  providedIn: 'root'
})
export class TripTemplateService {

  constructor(private http: HttpClient) {
  }

  getAll (paginationMetadata: PaginationOptionsInterface, withoutMetadata?: boolean): Observable<any> {
    let queryParams = '';
    if (paginationMetadata) {
      queryParams += `?size=${paginationMetadata.pageSize}&page=${paginationMetadata.pageIndex}`;
      if (paginationMetadata.search) {
        queryParams += `&search=${paginationMetadata.search}`;
      }
    }
    if (withoutMetadata) {
      queryParams += '&simple=true';
    }

    return this.http.get('/api/trip-templates' + queryParams);
  }

  upsert(params) {
    return this.http.patch(`/api/trip-templates/${params._id}`, params);
    // if(params._id && params._id !== 'new' && params._id !== ''){
    //   return this.update(params);
    // }
    // return this.create(params);
  }

  create (params): Observable<any> {
    return this.http.post('/api/trip-templates', params.body);
  }

  update (params): Observable<any> {
    return this.http.patch(`/api/trip-templates/${params._id}`, params);
  }

  getDetail (tripTemplate_id: string): Observable<any> {
    return this.http.get(`/api/trip-templates/${tripTemplate_id}?lang=es`);
  }

  getEventsFromTripTemplate (tripTemplate_id: string): Observable<any> {
    return this.http.get(`/api/trip-templates/${tripTemplate_id}/events`);
  }

  getItineraryFromTripTemplate (tripTemplate_id: string): Observable<any> {
    return this.http.get(`/api/trip-templates/${tripTemplate_id}/itinerary`);
  }

  deleteById (tripTemplate_id: string): Observable<any> {
    return this.http.delete(`/api/trip-templates/${tripTemplate_id}`);
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
