import axios from 'axios';
import { config } from '../../config/env';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class RolesService {

  public static async getAll(query, headers): Promise<any> {
    let queryParams = `?size=${query.size}&page=${query.page}`;
    if (query.search) {
      queryParams += `&search=${query.search}`;
    }
    return axios
      .get(`${config.idm.url}/roles`, {headers});
  }

  public static async getDetail(id: string, lang: string = 'en', headers): Promise<any> {
    return axios.get(`${config.idm.url}/roles/${id}`, {headers});
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
