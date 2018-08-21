import {Component, OnInit, ViewChild} from '@angular/core';
import {} from '@types/googlemaps';

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

  constructor() { }

  ngOnInit() {
    const mapProp = {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

}
