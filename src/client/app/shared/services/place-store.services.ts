import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceStore {

  private location = new BehaviorSubject({
    point: {
      lat: 0,
      lng: 0
    },
    label: '',
    formatted_address: '',
    place_id: ''
  });

  constructor() {}

  setLocation(location){
    this.location.next(location);
  }

  getLocation(){
    return this.location.asObservable();
  }
}
