import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  constructor(private http: HttpClient, private router: Router) { }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(username: string, password: string): Observable<any> {
    return this.http.post(`api/users/signin`, { username, password })
      .pipe(map((user: any) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedIn = true;
          this.router.navigate([this.redirectUrl]);
        }

        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
  }
}
