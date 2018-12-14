import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Place } from '../models/Place';


@Injectable({
  providedIn: 'root'
})
export class PlaceStore {
  private origin = new BehaviorSubject(undefined);
  private destination = new BehaviorSubject(undefined);
  private location = new BehaviorSubject(undefined);

  private waypoints = new BehaviorSubject(undefined);

  constructor() {
  }

  setLocation(location) {
    this.location.next(location);
  }

  getLocation() {
    return this.location.asObservable();
  }

  getPlace(location: string) {
    return (this[location] as BehaviorSubject<Place>).asObservable();
  }

  setPlace(location: string, place: Place) {
    (this[location] as BehaviorSubject<Place>).next(place);
  }

  getWaypoints() {
    return this.waypoints.asObservable();
  }

  setWaypoints(waypoints) {
    this.waypoints.next(waypoints);
  }

  clearAll() {
    this.origin = new BehaviorSubject(undefined);
    this.destination = new BehaviorSubject(undefined);
    this.location = new BehaviorSubject(undefined);
    this.waypoints = new BehaviorSubject(undefined);
  }
}
