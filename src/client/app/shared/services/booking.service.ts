import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaginationOptionsInterface } from '../common-list/common-list-item/pagination-options.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) { }

  getAll(paginationOptions: PaginationOptionsInterface): Observable<any> {
    return this.http.get('/api/bookings');
  }

  getDetail(id: string): Observable<any> {
    return this.http.get(`/api/bookings/${id}`);
  }

  create(body: any): Observable<any> {
    return this.http.post('/api/bookings', body);
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(`/api/bookings/${id}`);
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
