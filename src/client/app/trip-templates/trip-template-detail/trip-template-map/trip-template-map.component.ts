import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { Store } from '@ngrx/store';
import { TypeOfEvent } from '../../../shared/models/TripTemplate';
import { AppState } from '../../../store/shared/app.interfaces';
import { getDaysForSelectedTrip, getTripTemplatesEntities } from '../../../store/trip-template';
import { Subscription } from 'rxjs';
import {UpdateTimeDistance} from '../../../store/trip-template/trip-template.actions';

@Component({
  selector: 'app-trip-template-map',
  template: `
    <div #gmap style="width:100%; height:590px"></div>
  `
})
export class TripTemplateMapComponent implements OnInit, OnDestroy {

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  bounds: google.maps.LatLngBounds;
  directions: Array<any> = [];
  _referencesRenderer: Array<any> = [];
  _subscription: Subscription;
  tripTotalLength = 0;
  tripTotalTime = 0;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  terminalTypes = [
    TypeOfEvent.HOTEL,
    TypeOfEvent.TERMINAL,
  ];

  @Output() tripMapUpdated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    this._subscription = this.store.select(getDaysForSelectedTrip).subscribe((days: any) => {
      this.tripTotalTime = 0;
      this.tripTotalLength = 0;
      if (days && days.length) {

        this.directionsDisplay.setMap(this.map);
        this.bounds = new google.maps.LatLngBounds();
        this.markers.forEach(marker => marker.setMap(null));
        this.infoWindows = [];
        this.markers = [];
        this.directions = [];
        this._referencesRenderer.forEach(element => {
          element.setMap(null);

        });
        days.forEach((day) => {
          day.events.forEach((event) => {
            if (event.product)
              switch (event.event_type) {
                case TypeOfEvent.CUSTOM:
                  break;
                case TypeOfEvent.DRIVING:
                case 'walking':
                case 'bicycling':
                  const origin = event.product.origin !== null ? event.product.origin : event.product.referencedOrigin;
                  const destination = event.product.destination !== null ? event.product.destination : event.product.referencedDestination;
                  this.bounds.extend(origin.geo.point);
                  this.bounds.extend(destination.geo.point);

                  this.drawerPicker(origin.geo.point, {color: event.color, label: origin.name, type: event.product.route_type});
                  this.drawerPicker(destination.geo.point, {color: event.color, label: destination.name, type: event.product.route_type});

                  this.traceRoutes(
                    origin.geo.point,
                    event.product.middle_points.map(mp => ({location: mp.geo.point})),
                    destination.geo.point,
                    event.event_type.toUpperCase()
                  );
                  event.product.middle_points.forEach(mp => {
                    this.bounds.extend(mp.geo.point);
                    this.drawerPicker(mp.geo.point, {color: event.color, label: mp.name, type: mp.type});
                  });
                  this.tripTotalLength += event.product.legs.map(leg => leg.distance.value).reduce((a, b) => a + b);
                  this.tripTotalTime += event.product.legs.map(leg => leg.duration.value).reduce((a, b) => a + b);
                  break;
                default:
                  this.bounds.extend(event.product.geo.point);
                  this.drawerPicker(event.product.geo.point, {color: event.color, label: event.product.name, type: event.product.type});
                  break;
              }
          });


        });

        this.map.fitBounds(this.bounds);

        setTimeout(() => {
          // this.tripDistanceUpdate.emit({distance: this.tripTotalLength, duration: this.tripTotalTime});
          this.store.dispatch(new UpdateTimeDistance({distance: this.tripTotalLength, duration: this.tripTotalTime}));
        }, 0);
      }
    });

  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private drawerPicker(position, options: any = {}) {
    // this.bounds.extend(position);
    const infowindow = new google.maps.InfoWindow({
      content: `<h3>${options.label}</h3>`
    });

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: options.label,
      icon: {
        url: `/assets/icons/${options.type}.png`, // url
        scaledSize: new google.maps.Size(30, 42), // scaled size
      }
    });
    marker.addListener('click', () => {
      this.infoWindows.forEach(info => info.close());
      infowindow.open(this.map, marker);
    });
    this.infoWindows.push(infowindow);
    this.markers.push(marker);
  }

  private traceRoutes(start, waypts, end, travelMode): void {
    this.directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypts,
      travelMode: travelMode || google.maps.TravelMode.DRIVING
    }, result => {
      this.renderDirections(result);
    });
  }

  private renderDirections(directions) {
    directions.routes.forEach(route => {
      this.tripTotalLength += route.legs.map(leg => leg.distance.value).reduce((a, b) => a + b);
      this.tripTotalTime += route.legs.map(leg => leg.duration.value).reduce((a, b) => a + b);
    });


    this.tripMapUpdated.emit(Object.assign({}, {distance: this.tripTotalLength, duration: this.tripTotalTime}));
    this.store.dispatch(new UpdateTimeDistance({distance: this.tripTotalLength, duration: this.tripTotalTime}));
    this._referencesRenderer.push(new google.maps.DirectionsRenderer({
      directions: directions,
      map: this.map,
      suppressMarkers: true,
      preserveViewport: true
    }));

  }

}
