import { Component, OnInit, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { Store } from '@ngrx/store';
import { TypeOfEvent } from '../../../shared/models/TripTemplate';
import { AppState } from '../../../store/shared/app.interfaces';
import { getTripTemplatesEntities } from '../../../store/trip-template';

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
  directions: Array<any> = [];
  _referencesRenderer: Array<any> = [];
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


    this.store.select(getTripTemplatesEntities).subscribe((data: any) => {
      if (data.selectedTripTemplate &&
        data.selectedTripTemplateEvents &&
        data.selectedTripTemplateEvents.length > 0) {

        this.directionsDisplay.setMap(this.map);

        // const waypoints = new Array();
//

        this.markers.forEach(marker => marker.setMap(null));
        this.directions = [];
        this._referencesRenderer.forEach(element => {
          element.setMap(null);

        });
        data.selectedTripTemplateEvents.forEach((element, index, array) => {
          this.drawerPicker(element, index, array);
        }, this);
         setTimeout(() => {
            this.directions.forEach(element => this.traceRoutes(element.origin, [], element.destination));
         }, 100);



        // this.calculateAndDisplayRoute(waypoints);
      }
    });

  }

  private drawerPicker(element, index, array) {
    /// MIRAR::: al estar ejecutandose dentro del iterador, el this queda como undefined.
    if (element.eventType === TypeOfEvent.DRIVING) {
      let origin = element.geo[0].origin.geo.point, destination = element.geo[0].destination.geo.point;
      if (element.geo[0].origin.type === 'REFERENCE' && index > 0 && array[index - 1].eventType !== TypeOfEvent.DRIVING)
        origin = array[index - 1].geo[0];
      if (element.geo[0].destination.type === 'REFERENCE' && index < array.length - 1 && array[index + 1].eventType !== TypeOfEvent.DRIVING)
        destination = array[index + 1].geo[0];
      this.directions.push({origin, middle_points: element.geo[0].middle_points, destination});
      // this.traceRoutes(origin, element.geo[0].middle_points, destination);
    } else {
      this.markers.push(new google.maps.Marker({
        position: element.geo[0],
        map: this.map,
        title: ''
      }));
    }
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

    this._referencesRenderer.push( new google.maps.DirectionsRenderer({
      directions: directions,
      map: this.map,
      suppressMarkers: true
    }));

  }

}
