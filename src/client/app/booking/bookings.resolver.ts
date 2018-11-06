import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { BookingService } from '../shared/services/booking.service';
import { Booking } from '../shared/models/Booking';


@Injectable({
  providedIn: 'root'
})
export class BookingsResolver implements Resolve<any> {

  constructor(
    private service: BookingService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    if (id === 'new')
      return of(new Booking());

    return this.service.getDetail(id)
      .pipe(catchError((err)  => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/']); // could redirect to error page
        return EMPTY;
      }));
  }
}
