import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {} from '@types/googlemaps';
import {Point} from '../../../shared/models/Point';
import {PlaceService} from '../../../shared/services/place.service';
import {Observable} from 'rxjs';
import {PlaceStore} from '../../../shared/services/place-store.services';

@Component({
  selector: 'app-route-map',
  templateUrl: './route-map.component.html',
  styleUrls: ['./route-map.component.scss']
})
export class RouteMapComponent implements OnInit {

  @Input()
  routeGroup: FormGroup;

  @ViewChild('gmap') gmapElement: any;

  map: google.maps.Map;
  markers: google.maps.Marker[] = [];
  middlePoints: Point[] = [];
  autocompleteTimeout;
  options: Point[];
  lastSearch = '';

  constructor(private fb: FormBuilder, private placeService: PlaceService, private placeStore: PlaceStore) {
  }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  displayFn(value) {
    return value.name;
  }

  addPoint() {
    this.middlePoints.push(new Point());
  }

  deletePoint($event, index){
    this.middlePoints.splice(index, 1);
    this.markers[index+1].setMap(null);
    this.markers.splice(index+1, 1);
    this.saveControl();
    this.centerMap();
  }

  setMiddlePoint(event, index) {
    this.middlePoints[index]._id = event.option.value._id;
    this.middlePoints[index].name = event.option.value.name;
    this.middlePoints[index].description = event.option.value.description;
    this.middlePoints[index].location = event.option.value.location;
    this.middlePoints[index].place_id = event.option.value.place_id;
    this.saveControl();
    this.options = [];
    this.markers.splice(index+1, 0, undefined);
    this.setPoint(event, index + 1);
    console.log(event);
  }

  setPoint(event, i){
    this.placeService.search(`place_id=${event.option.value.place_id}`).subscribe(place => {
      console.log(place);
      if(place.length === 0) // TODO: show message
        return false;

      if(this.markers[i])
        this.markers[i].setPosition(place[0].geo.point);
      else
        this.markers[i] = new google.maps.Marker({position: place[0].geo.point, map: this.map});

      this.centerMap();
    });
  }

  private centerMap(){
    const bounds = new google.maps.LatLngBounds();
    for(let j=0; j < this.markers.length; j++){
      bounds.extend(this.markers[j].getPosition());
    }

    this.map.setCenter(bounds.getCenter());
    this.map.fitBounds(bounds);
  }

  search(event) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch){
      return false;
    }

    this.lastSearch = event.target.value;
    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
       this.placeService.autocomplete(event.target.value).subscribe(resp => {
         this.options = resp;
       });
    }, 300);

  }

  private saveControl(){
    const points = this.middlePoints.map(point => this.fb.group(point));
    const faPoints = this.fb.array(points);
    this.routeGroup.setControl('middle_points', faPoints);
  }

}
