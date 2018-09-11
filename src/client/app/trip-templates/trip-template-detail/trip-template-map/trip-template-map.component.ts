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
  directions: Array<any> = [];
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
      if (data.selectedTripTemplate && data.selectedTripTemplateEvents && data.selectedTripTemplateEvents.length > 0) {

        console.log('**************************')
        console.log(this.directions);
        this.directions.forEach(bla => bla.setMap(null))

        this.directionsDisplay.setMap(null); // clear direction from the map
        this.directionsDisplay.setPanel(null);

        this.directionsDisplay.setMap(this.map);

        const waypoints = new Array();

        setTimeout(() => {}, 1000);
        this.markers.forEach(marker => marker.setMap(null));
        data.selectedTripTemplateEvents.forEach((element, index, array) => {
          this.drawerPicker(element, index, array);
          }, this);

        // this.calculateAndDisplayRoute(waypoints);
      }
    });

  }

  private drawerPicker(element, index, array) {
    /// MIRAR::: al estar ejecutandose dentro del iterador, el this queda como undefined.
    console.log('chinga', element);
    switch (element.eventType) {
      case eventType.DRIVING:
        let origin = element.geo[0].origin.geo.point, destination = element.geo[0].destination.geo.point;
        if (element.geo[0].origin.type === 'REFERENCE' && index > 0 && array[index - 1].eventType !== eventType.DRIVING)
          origin = array[index - 1].geo[0];
        if (element.geo[0].destination.type === 'REFERENCE' && index < array.length - 1 && array[index + 1].eventType !== eventType.DRIVING)
          destination = array[index + 1].geo[0];
        console.log('*****origin*****?', origin);
        // this.directionsService.route({
        //   origin: origin,
        //   destination: destination,
        //   waypoints: element.geo[0].middle_points,
        //   travelMode: google.maps.TravelMode.DRIVING
        // }, result => {
        //   this.renderDirections(result);
        //   // const directionsRender = new google.maps.DirectionsRenderer();
        //   // directionsRender.setMap(this.map);
        //   // directionsRender.setDirections(result);
        // });
        this.traceRoutes(origin, element.geo[0].middle_points, destination);
        break;
      case eventType.HOTEL:
      case eventType.ACTIVITY:
        console.log('pppp', array[index + 1]);
        if (index + 1 === array.length ||
          // array[index + 1].geo[0].origin.type !== 'REFERENCE' ||
          ( array[index + 1].eventType !== 'DRIVING' && array[index - 1].eventType !== 'DRIVING' )
          // || (index > 0 && array[index - 1].geo[0].destination.type !== 'REFERENCE')
        )
          this.markers.push(new google.maps.Marker({
            position: element.geo[0],
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

    this.directions.push(directionsRender);
  }

}
