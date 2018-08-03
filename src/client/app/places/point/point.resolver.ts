import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {PlaceService} from '../../shared/services/place.service';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {Point} from '../../shared/models/Place';


@Injectable({
  providedIn: 'root'
})
export class PointResolver implements Resolve<any> {

  constructor(
    private service: PlaceService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id');
    if(id === 'new')
      return of(new Point());

    return this.service.search(`_id=${id}`)
      .pipe(catchError((err)  => {
        console.error(err); // deal with API error (eg not found)
        this.router.navigate(['/']); // could redirect to error page
        return EMPTY;
      }));
  }
}
