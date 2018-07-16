import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
}
