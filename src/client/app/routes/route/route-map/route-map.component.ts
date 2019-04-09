import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import {} from '@types/googlemaps';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { FormGroup } from '@angular/forms';
import { Place } from '../../../shared/models/Place';
import { PlaceService } from '../../../shared/services/place.service';
import { TerminalSelected } from '../../../store/trip-template/event/event.actions';
import { RouteDrawed } from '../../../store/route/route.actions';
import { Leg } from '../../../shared/models/Segment';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/shared/app.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-route-map',
  template: `
    <div #gmap style="width:100%; height:500px"></div>`,
})
export class RouteMapComponent implements OnInit, OnDestroy {

  _routeType = 'driving';
  _routeReached = false;
  bounds: google.maps.LatLngBounds;
  directions: Array<any> = [];
  _referencesRenderer: Array<any> = [];
  originalRelated = [];

  @Input() form: FormGroup;
  @Input() set routeCompleted(routeReached: boolean) {
    if (routeReached) {
      this._routeReached = true;
      this.getRelated();
    }
  }
  @Input() set nearPoints(nearPoint: Array<any>) {
    if (nearPoint) {
      this.originalRelated = nearPoint;
      this.getRelated(nearPoint);
    } else {
      this.getRelated([]);
    }
  }

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('added-route') addRouteElement: any;
  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  waypoints = [];
  origin: Place;
  destination: Place;
  infoWindows: google.maps.InfoWindow[] = [];
  nearMarkers: any = [];
  docListener: any;
  lastMarker: any;
  routeTypeSubscription: Subscription;

  private stepDisplay = new google.maps.InfoWindow;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});
  private geocoder = new google.maps.Geocoder();

  constructor(private placeStore: PlaceStore,
              private placeService: PlaceService,
              private renderer: Renderer2,
              private elementRef: ElementRef,
              private store: Store<AppState>
  ) { }

  ngOnInit() {
    this._routeType = this.form.controls.route_type.value || 'driving';
    this.routeTypeSubscription = this.form.get('route_type').valueChanges.subscribe(resp => {
      this.calculateAndDisplayRoute();
    });

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      rotateControl: false,
      streetViewControl: false
    };
    this.infoWindows = [];
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setOptions({suppressMarkers: true});

    this.map.addListener('click', (e) => {
      this.geocoder.geocode({location: e.latLng.toJSON()}, (resp) => {
        const place = new Place({
          name: resp[0].formatted_address.split(',')[0],
          geo: {
            point: e.latLng.toJSON()
          },
          type: 'waypoint',
          _id: '',
          place_id: resp[0].place_id
        });

        let infoContent = `<h3>${resp[0].formatted_address.split(',')[0]}</h3>\n`;
        infoContent += `<button mat-flat-button id="adder-route">Agregar a la ruta</button>`;

      const infowindow = new google.maps.InfoWindow({
        content: infoContent
      });

        const marker = new google.maps.Marker({
          position: e.latLng.toJSON(),
          map: this.map,
          title: e.latLng.toString(),
          icon: {
            url: `/assets/icons/waypoint.png`, // url
            scaledSize: new google.maps.Size(30, 42), // scaled size
          }
        });

      this.lastMarker = marker;

      infowindow.addListener('closeclick', (lalala) => {
        if (this.docListener) this.docListener();
        this.markers = this.markers.filter((thyMarker: any) => thyMarker.title !== this.lastMarker.title);
        this.lastMarker.setMap(null);
      });

      this.infoWindows.forEach(info => info.close());
      infowindow.open(this.map, marker);
      this.docListener = this.renderer.listen('document', 'click', (evt) => {
        if (evt.target.id === 'adder-route') {
          const textTitle = evt.path[1].childNodes[0].textContent;
          this.placeStore.setLocation(place);
          this.waypoints.push(place);
          this.addMarker();
          if (this.docListener) this.docListener();
        }
      });

      this.infoWindows.push(infowindow);
      this.markers.push(marker);
    });

    this.placeStore.getWaypoints().subscribe(( waypoints ) => {
      if (!waypoints)
        return false;
      if (!Array.isArray(waypoints)) {
        waypoints = Object.keys(waypoints).map( key => waypoints[key]);
      }
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
  });
  }

  ngOnDestroy() {
    this.routeTypeSubscription.unsubscribe();
  }

  private addMarker() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    if (this.origin)
      this.drawerPicker(this.origin.geo.point, {label: this.origin.name, type: 'destination'});

    this.waypoints
      // .filter(place => place.types !== 'waypoint')
      .forEach((place, i) => {
        this.drawerPicker(place.geo.point, {label: place.name, type: place.type});
      });

    if (this.destination)
      this.drawerPicker(this.destination.geo.point, {label: this.destination.name, type: 'destination'});

    this.calculateAndDisplayRoute();
  }

  private drawerPicker(position, options: any = {}, related = false) {
    // this.bounds.extend(position);
    let infoContent = `<h3>${options.label}</h3>\n`;
    let icon = {
      url: `/assets/icons/${options.type}.png`, // url
      scaledSize: new google.maps.Size(30, 42)
    };
    if (related) {
      infoContent += `<button mat-flat-button id="adder-route">Agregar a la ruta</button>`;
      icon = {
        url: `/assets/icons/${options.type}_off.png`, // url
        scaledSize: new google.maps.Size(20, 20)
      };
    }
    const infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    infowindow. addListener('closeclick', () => {
      if (this.docListener) this.docListener();
    });

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: options.label,
      icon: icon
    });
    marker.addListener('click', () => {
      this.infoWindows.forEach(info => info.close());
      infowindow.open(this.map, marker);
      this.docListener = this.renderer.listen('document', 'click', (evt) => {
        if (evt.target.id === 'adder-route') {
          const textTitle = evt.path[1].childNodes[0].textContent;
          this.addNearPlace(textTitle);
        }
      });
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

    if (this.nearMarkers.length > 0) {
      this.nearMarkers = this.originalRelated
        .filter(mrkRelated => !this.waypoints.map(wpt => wpt.name).includes(mrkRelated.name));
      this.nearMarkers.forEach(point => {
        this.drawerPicker(point.geo.point, {label: point.name, type: point.type}, true);
      });
    }

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
      travelMode: google.maps.TravelMode[this.form.get('route_type').value.toUpperCase()]
    }, (response, status: any) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        const legs: Leg[] = response.routes[0].legs
          .map(value => (
            {
              distance: value.distance,
              duration: value.duration
            })
          );
        this.store.dispatch(new RouteDrawed(legs));
        this.form.patchValue({legs: legs});
      } else {
        console.log('no disponible', response, status);
      }
    });
  }

  private getRelated(pointsToDraw?: Array<any>) {
    if (this.origin && this.destination) {
      this.cleanMarkers();
      if (pointsToDraw) {
        pointsToDraw.forEach(point => {
          this.nearMarkers.push(point);
          this.drawerPicker(point.geo.point, {label: point.name, type: point.type}, true);
        });
      }
    }
  }

  private cleanMarkers() {
    this.directionsDisplay.setMap(this.map);
    this.bounds = new google.maps.LatLngBounds();
    const nearMarkerTitles = this.nearMarkers.map(marker => marker.name);
    const originalMarkersArray = [];
    this.markers.forEach(mrk => {
      if (nearMarkerTitles.includes(mrk.getTitle())) mrk.setMap(null);
      else originalMarkersArray.push(mrk);
    });
    this.markers = originalMarkersArray.slice();
    this.infoWindows = [];
    this.nearMarkers = [];
    this.directions = [];
    this._referencesRenderer.forEach(element => {
      element.setMap(null);

    });
  }

  private addNearPlace(placeName) {
    const place = this.nearMarkers.filter(marker => marker.name === placeName)[0];
    this.placeStore.setLocation(place);
    this.waypoints.push(place);
    if (this.docListener) this.docListener();
    this.addMarker();
    const markerIndex = this.nearMarkers.map(pt => pt.name).indexOf(placeName);
    if (markerIndex >= 0) this.nearMarkers.splice(markerIndex, 1);
    this.getRelated(this.nearMarkers);
  }

}
