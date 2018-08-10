import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {RoutesService} from '../shared/services/routes.service';
import { default as Segment } from '../shared/models/Segment';


@Injectable({
  providedIn: 'root'
})
export class RoutesResolver implements Resolve<any> {

  constructor(
    private service: RoutesService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    if(id === 'new')
      return of(new Segment());

    return this.service.getDetail(id)
      .pipe(catchError((err)  => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/']); // could redirect to error page
        return EMPTY;
      }));
  }
}
