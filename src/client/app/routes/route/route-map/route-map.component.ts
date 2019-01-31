import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { FormGroup } from '@angular/forms';
import { Place } from '../../../shared/models/Place';

@Component({
  selector: 'app-route-map',
  template: `
    <div #gmap style="width:100%; height:500px"></div>`,
})
export class RouteMapComponent implements OnInit {
  @Input()
  form: FormGroup;
  _routeType = 'driving';

  @Input() set routeType(routeType: string) {
    if (routeType) {
      this._routeType = routeType;
      this.calculateAndDisplayRoute();
    }
  }

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  waypoints = [];
  origin: Place;
  destination: Place;
  infoWindows: google.maps.InfoWindow[] = [];

  private stepDisplay = new google.maps.InfoWindow;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});

  constructor(private placeStore: PlaceStore) { }

  ngOnInit() {
    this._routeType = this.form.controls.route_type.value || 'driving';

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.infoWindows = [];
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({suppressMarkers: true});

    this.map.addListener('click', (e) => {
      const place = new Place({
        name: 'Waypoint',
        geo: {
          point: e.latLng.toJSON()
        },
        type: 'waypoint',
        _id: ''
      });

      this.placeStore.setLocation(place);
      this.waypoints.push(place);
      this.addMarker();
      // this.calculateAndDisplayRoute();
    });

    this.placeStore.getWaypoints().subscribe(( waypoints ) => {
      if (!waypoints)
        return false;
      this.waypoints = waypoints;
      this.addMarker();
    });

    this.placeStore.getPlace('origin').subscribe((place: Place) => {
      if (!place)
        return false;
      this.origin = place;
      this.addMarker();
    });

    this.placeStore.getPlace('destination').subscribe((place) => {
      if (!place)
        return false;
      this.destination = place;
      this.addMarker();
    });
    //
  }

  private addMarker() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    if (this.origin)
      this.drawerPicker(this.origin.geo.point, {label: this.origin.name, type: this.origin.type});

    this.waypoints
      // .filter(place => place.types !== 'waypoint')
      .forEach((place, i) => {
        this.drawerPicker(place.geo.point, {label: place.name, type: place.type});
      });

    if (this.destination)
      this.drawerPicker(this.destination.geo.point, {label: this.destination.name, type: this.destination.type});

    this.calculateAndDisplayRoute();
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

  private centerMap() {
    const bounds = new google.maps.LatLngBounds();
    for (let j = 0; j < this.markers.length; j++) {
      bounds.extend(this.markers[j].getPosition());
    }
    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  private calculateAndDisplayRoute() {
    const waypts = [];
    this.waypoints.forEach((place: Place) => {
      waypts.push({
        location: place.geo.point,
        stopover: true
      });
    });

    if (!this.origin || !this.destination) {
      this.centerMap();
      return false;
    }

    // TODO: Optimize waypoints
    this.directionsService.route(<any>{
      origin: this.origin.geo.point,
      destination: this.destination.geo.point,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: google.maps.TravelMode[this._routeType.toUpperCase()]
    }, (response, status: any) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        const legs = response.routes[0].legs
          .map(value => (
            {
              distance: value.distance,
              duration: value.duration
            })
          );

        this.form.patchValue({legs: legs});
      } else {
        console.log('no disponible', response, status);
      }
    });
  }

}
