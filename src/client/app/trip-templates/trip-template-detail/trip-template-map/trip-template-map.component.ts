import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';
import {AppState, tripTemplateSelector} from '../../../store';
import {Store} from '@ngrx/store';

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
      if (data.selectedTripTemplateEvents) {
        this.directionsDisplay.setMap(this.map);
        const waypoints = [];
        data.selectedTripTemplateEvents.forEach(
            event => {
              event.geo.forEach( point => waypoints.push({location: point, stopover: true}));
          });
        this.calculateAndDisplayRoute(waypoints);
      }
    });

  }

  private calculateAndDisplayRoute(waypts: Array<any>) {

    const origin = waypts.shift().location;
    const destination = waypts.pop().location;

    // TODO: Optimize waypoints
    this.directionsService.route(<any>{
      origin,
      destination,
      waypoints: waypts,
      optimizeWaypoints: false,
      travelMode: 'DRIVING'
    }, (response, status: any) => {
      if(status === 'OK'){
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

}
