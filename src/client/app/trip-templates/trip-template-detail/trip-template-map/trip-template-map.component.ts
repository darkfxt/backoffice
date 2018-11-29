import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {Store} from '@ngrx/store';
import {TypeOfEvent} from '../../../shared/models/TripTemplate';
import {AppState} from '../../../store/shared/app.interfaces';
import {getDaysForSelectedTrip, getTripTemplatesEntities} from '../../../store/trip-template';
import {Subscription} from 'rxjs';

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


    this._subscription = this.store.select(getDaysForSelectedTrip).subscribe((days: any) => {
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
              switch (event.eventType) {
                case TypeOfEvent.DRIVING:
                  const origin = event.product.origin !== null ? event.product.origin : event.product.referencedOrigin;
                  const destination = event.product.destination !== null ? event.product.destination : event.product.referencedDestination;
                  this.bounds.extend(origin.geo.point);
                  this.bounds.extend(destination.geo.point);

                  if (this.terminalTypes.indexOf(origin.type) > -1)
                    this.drawerPicker(origin.geo.point, {color: event.color, label: origin.name, type: event.eventType});

                  if (this.terminalTypes.indexOf(destination.type) > -1)
                    this.drawerPicker(destination.geo.point, {color: event.color, label: destination.name, type: event.eventType});

                  this.traceRoutes(
                    origin.geo.point,
                    event.product.middle_points.map(mp => ({location: mp.geo.point})),
                    destination.geo.point
                  );
                  event.product.middle_points.forEach(mp => {
                    this.bounds.extend(mp.geo.point);
                    this.drawerPicker(mp.geo.point, {color: event.color, label: mp.name, type: mp.type});
                  });
                  break;
                default:
                  this.bounds.extend(event.product.geo.point);
                  this.drawerPicker(event.product.geo.point, {color: event.color, label: event.product.name, type: event.eventType});
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

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private drawerPicker(position, options: any = {}) {
    //this.bounds.extend(position);
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
      suppressMarkers: true,
      preserveViewport: true
    }));

  }

}
