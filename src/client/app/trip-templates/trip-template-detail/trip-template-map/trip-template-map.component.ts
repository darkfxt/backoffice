import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { AppState, tripTemplateSelector } from '../../../store';
import { Store } from '@ngrx/store';
import { eventType } from '../../../shared/models/TripTemplate';

@Component({
  selector: 'app-trip-template-map',
  template: `
    <div #gmap style="width:100%; height:340px"></div>
  `
})
export class TripTemplateMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  _self: any;

  private stepDisplay = new google.maps.InfoWindow;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    this.store.select(tripTemplateSelector).subscribe((data: any) => {
      if (data.selectedTripTemplate && data.selectedTripTemplate.events && data.selectedTripTemplate.events.length > 0) {
        this.directionsDisplay.setMap(this.map);

        const waypoints = new Array();
        this._self = this;
        data.selectedTripTemplate.events.forEach(this.drawerPicker);

        // this.calculateAndDisplayRoute(waypoints);
      }
    });

  }

  private drawerPicker(element, index, array) {
    /// MIRAR::: al estar ejecutandose dentro del iterador, el this queda como undefined.
    console.log(this);
    switch (element.eventType) {
      case eventType.DRIVING:
        let origin = element.geo[0].origin.geo, destination = element.geo[0].destination.geo;
        if (element.geo[0].origin.type === 'REFERENCE' && index > 1 && array[index - 1].eventType !== eventType.DRIVING)
          origin = array[index - 1].geo;
        if (element.geo[0].destination.type === 'REFERENCE' && index < array.length - 1 && array[index + 1].eventType !== eventType.DRIVING)
          destination = array[index + 1].geo;

        this.directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: element.geo[0].middle_points,
          travelMode: google.maps.TravelMode.DRIVING
        }, result => {
          // this.renderDirections(result);
          const directionsRender = new google.maps.DirectionsRenderer();
          directionsRender.setMap(this.map);
          directionsRender.setDirections(result);
        });
        // this.traceRoutes(origin, element.geo[0].middle_points, destination);
        break;
      case eventType.HOTEL:
      case eventType.ACTIVITY:
        if (index + 1 === array.length ||
          array[index + 1].geo[0].origin.type !== 'REFERENCE' ||
          (index > 0 && array[index - 1].geo[0].destination.type !== 'REFERENCE'))
          this.markers.push(new google.maps.Marker({
            position: element.geo,
            map: this.map,
            title: ''
          }));
        break;
      default:
        break;

    }
  }

  private calculateAndDisplayRoute(waypts: Array<any>) {
    let origin, destination;
    if (!waypts.length || waypts.length < 1) {
      return;
    } else if (waypts.length === 1) {
      origin = waypts[0].location;
      destination = waypts.pop().location;
    } else {
      origin = waypts.shift().location;
      destination = waypts.pop().location;
    }

    // TODO: Optimize waypoints
    this.directionsService.route(<any>{
      origin,
      destination,
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
      }
    });
  }

  private centerMap(markers) {
    const bounds = new google.maps.LatLngBounds();
    for (let j = 0; j < markers.length; j++) {
      bounds.extend(markers[j].getPosition());
    }
    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  private traceRoutes (start, waypts, end): void {
    this.directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING
    }, result => {
      this.renderDirections(result);
    });
  }

  private renderDirections (directions) {
    const directionsRender = new google.maps.DirectionsRenderer();
    directionsRender.setMap(this.map);
    directionsRender.setDirections(directions);
  }

}
