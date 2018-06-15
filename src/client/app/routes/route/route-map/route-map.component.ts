import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {} from '@types/googlemaps';
import {Point} from '../../../shared/models/Point';

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
  marker: google.maps.Marker;
  originOptions: Point[];
  destinationOptions: Point[];
  middlePointsOptions: Point[];
  pointAdded = true;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      title: 'Click to zoom'
    });

    this.originOptions = [
      new Point('1', 'culo', 'asd', 'bla')
    ];

    this.middlePointsOptions = [
      new Point('2', 'pito', 'asd', 'bla')
    ];

    this.destinationOptions = [
      new Point('3', 'teta', 'asd', 'bla')
    ];
  }

  get middlePoints(): FormArray {
    return this.routeGroup.get('middle_points') as FormArray;
  }

  displayFn(value) {
    return value.name;
  }

  addPoint() {
    this.middlePoints.push(this.fb.group(new Point()));
  }

  deletePoint($event, index){
    this.middlePoints.controls.splice(index, 1);
  }

  setMiddlePoint(event, index, elem: ElementRef) {
    this.middlePoints.value[index] = event.option.value;
    console.log(event);
  }

}
