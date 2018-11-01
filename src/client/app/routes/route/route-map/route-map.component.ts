import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { PlaceStore } from '../../../shared/services/place-store.services';
import Place from '../../../../../server/api/entity/Place';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-route-map',
  template: `
    <div #gmap style="width:100%; height:340px"></div>`,
})
export class RouteMapComponent implements OnInit {
  @Input()
  form: FormGroup;

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  waypoints = [];
  origin: Place;
  destination: Place;

  private stepDisplay = new google.maps.InfoWindow;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});

  constructor(private placeStore: PlaceStore) { }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({suppressMarkers: true});

    this.map.addListener('click', (e) => {
      const place = new Place({
        name: 'Waypoint',
        geo: {
          point: e.latLng.toJSON()
        },
        type: 'WAYPOINT',
        _id: ''
      });

      this.placeStore.setLocation(place);
      this.waypoints.push(place);
      this.calculateAndDisplayRoute();
    });

    this.placeStore.getWaypoints().subscribe(( waypoints ) => {
      if (!waypoints)
        return false;
      this.waypoints = waypoints;
      this.addMarker();
    });

    this.placeStore.getPlace('origin').subscribe((place) => {
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
  }

  private addMarker() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    if (this.origin)
      this.markers.push(new google.maps.Marker({position: this.origin.geo.point, title: this.origin.name, map: this.map}));

    this.waypoints
      .filter(place => place.type !== 'WAYPOINT')
      .forEach((place, i) => {
        this.markers.push(new google.maps.Marker({position: place.geo.point, title: place.name, map: this.map}));
      });

    if (this.destination)
      this.markers.push(new google.maps.Marker({position: this.destination.geo.point, title: this.destination.name, map: this.map}));

    this.markers.forEach((marker: google.maps.Marker) => {
      marker.addListener('click', () => {
        this.stepDisplay.setContent(marker.getTitle());
        this.stepDisplay.open(this.map, marker);
      });
    });

    this.calculateAndDisplayRoute();
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
      travelMode: 'DRIVING'
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
      }
    });
  }

}
