import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { DeviceService } from '../shared/services/device.service';
import {Device} from '../shared/models/Device';


@Injectable({
  providedIn: 'root'
})
export class DevicesResolver implements Resolve<any> {

  constructor(
    private service: DeviceService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    if (id === 'new')
      return of(new Device());

    return this.service.getDetail(id)
      .pipe(catchError((err)  => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/']); // could redirect to error page
        return EMPTY;
      }));
  }
}
