import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RouteHelper {
  constructor() {}

  calculateDistanceAndTime(legs = []): any {
    let distance = 0;
    let duration = 0;

    legs.forEach((element) => {
      distance += element.distance ? element.distance.value : 0;
      duration += element.duration ? element.duration.value : 0;
    });

    return {
      distance: Math.floor(distance / 1000), duration: duration
    };
  }
}

