import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {} from '@types/googlemaps';
import {PlaceStore} from '../../../shared/services/place-store.services';

@Component({
  selector: 'app-point-map',
  templateUrl: './point-map.component.html',
  styleUrls: ['./point-map.component.scss']
})
export class PointMapComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  @ViewChild('location') location: ElementRef;
  @ViewChild('address') address: ElementRef;

  @Input('mapGroup')
  placeForm: FormGroup;

  map: google.maps.Map;
  marker: google.maps.Marker;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  constructor(private placeStore: PlaceStore) {
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

    this.map.addListener('bounds_changed', () => {
      this.marker.setPosition(this.map.getCenter());
    });

    this.map.addListener('dragend', () => {
      this.geocoder.geocode({
        location: this.map.getCenter()
      }, resp => {
        if (resp && resp.length > 0) {
          this.updateForm(resp[0]);
        }
      });
    });

    this.placeStore.getLocation().subscribe(location => {
      if (location.point.lat === 0 && location.point.lng === 0)
        return false;
      const coords = new google.maps.LatLng(location.point.lat, location.point.lng);
      this.map.setCenter(coords);
      this.updateForm(location);
    });
  }

  onChangeCoords(event) {
    if (this.placeForm.get('geo').value.label.length < 5) {
      return false;
    }

    const location = this.placeForm.get('geo').value.label.split(',');
    const coords = new google.maps.LatLng(location[0], location[1]);
    this.map.setCenter(coords);
    this.geocoder.geocode({
      location: this.map.getCenter()
    }, resp => {
      if (resp && resp.length > 0) {
        this.updateForm(resp[0]);
      }
    });
  }

  onChangeAddress(event) {
    event.preventDefault();
    if (event.code !== 'Enter')
      return false;

    const address = this.placeForm.get('geo').value.address;

    this.geocoder.geocode({
      address: address
    }, resp => {
      if (resp && resp.length > 0) {
        this.map.setCenter(resp[0].geometry.location);
        this.updateForm(resp[0]);
      }
    });
  }

  private updateForm(resp) {
    this.map.setZoom(17);
    const data = {
      geo: {
        label: this.map.getCenter().toUrlValue(),
        location: this.map.getCenter().toJSON(),
        address: resp.formatted_address
      },
      place_id: resp.place_id
    };
    this.placeForm.patchValue(data);
  }

}
