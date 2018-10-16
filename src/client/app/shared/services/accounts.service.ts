import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient } from '@angular/common/http';
import {PaginationOptionsInterface} from '../common-list/common-list-item/pagination-options.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  getAll (paginationMetadata?: PaginationOptionsInterface, withoutMetadata?: boolean): Observable<any> {
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

    return this.http.get('/api/accounts' + queryParams);
  }

  upsert (params): Observable<any> {
    if (params.id && params.id !== '')
      return this.http.patch(`/api/accounts/${params.id}`, params.body);
    else
      return this.http.post('/api/accounts', params.body);
  }

  getDetail(id): Observable<any> {
    return this.http.get(`/api/accounts/${id}`);
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
