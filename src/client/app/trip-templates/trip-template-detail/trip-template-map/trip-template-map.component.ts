import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { Store } from '@ngrx/store';
import { TypeOfEvent } from '../../../shared/models/TripTemplate';
import { AppState } from '../../../store/shared/app.interfaces';
import {getDaysForSelectedTrip, getTripTemplatesEntities} from '../../../store/trip-template';

@Component({
  selector: 'app-trip-template-map',
  template: `
    <div #gmap style="width:100%; height:590px"></div>
  `
})
export class TripTemplateMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  bounds: google.maps.LatLngBounds;
  directions: Array<any> = [];
  _referencesRenderer: Array<any> = [];
  _self: any;

  private stepDisplay = new google.maps.InfoWindow;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  terminalTypes = [
    TypeOfEvent.HOTEL,
    TypeOfEvent.TERMINAL
  ];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    this.store.select(getDaysForSelectedTrip).subscribe((days: any) => {
      if (days && days.length) {

        this.directionsDisplay.setMap(this.map);
        this.bounds = new google.maps.LatLngBounds();
        this.markers.forEach(marker => marker.setMap(null));
        this.directions = [];
        this._referencesRenderer.forEach(element => {
          element.setMap(null);

        });
        days.forEach((day) => {
          day.events.forEach((event) => {
            switch (event.eventType) {
              case TypeOfEvent.DRIVING:
                const origin = event.product.origin !== null ? event.product.origin : event.product.referencedOrigin;
                const destination = event.product.destination !== null ? event.product.destination : event.product.referencedDestination;
                if (this.terminalTypes.indexOf(origin.type) > -1)
                  this.drawerPicker(origin.geo.point, {color: event.color});
                if (this.terminalTypes.indexOf(destination.type) > -1)
                  this.drawerPicker(destination.geo.point, {color: event.color});

                this.traceRoutes(origin.geo.point, event.product.middle_points, destination.geo.point);
                break;
              default:
                this.drawerPicker(event.product.geo.point, {color: event.color});
                break;
            }
          });


        });

        this.map.fitBounds(this.bounds);

        /*
        setTimeout(() => {
          this.directions.forEach(element => this.traceRoutes(element.origin, [], element.destination));
        }, 100);
*/

        // this.calculateAndDisplayRoute(waypoints);
      }
    });

  }

  private drawerPicker(position, options: any = {}) {
    this.bounds.extend(position);
    this.markers.push(new google.maps.Marker({
      position: position,
      map: this.map,
      title: ''
    }));
  }

  private traceRoutes(start, waypts, end): void {
    this.directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING
    }, result => {
      this.renderDirections(result);
    });
  }

  private renderDirections(directions) {

    this._referencesRenderer.push(new google.maps.DirectionsRenderer({
      directions: directions,
      map: this.map,
      suppressMarkers: true
    }));

  }

}
