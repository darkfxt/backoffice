import {Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {} from '@types/googlemaps';
import {PlaceStore} from '../../../shared/services/place-store.services';
import {AddressComponent} from '../../../../../server/api/entity/GooglePlace';

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
      }, (resp: any) => {
        if (resp && resp.length > 0) {
          resp[0].geo = this.getAddress(resp[0]);
          this.updateForm(resp[0]);
        }
      });
    });

    this.placeStore.getLocation().subscribe(location => {
      if (location.geo.point.lat === 0 && location.geo.point.lng === 0)
        return false;
      this.map.setCenter(location.geo.point);
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
    }, (resp: any) => {
      if (resp && resp.length > 0) {
        resp[0].geo = this.getAddress(resp[0]);
        this.updateForm(resp[0]);
      }
    });
  }

  onChangeAddress(event) {
    event.preventDefault();
    if (event.code !== 'Enter')
      return false;

    const address = this.placeForm.get('geo').value.address.formatted_address;

    this.geocoder.geocode({
      address: address
    }, (resp: any) => {
      if (resp && resp.length > 0) {
        this.map.setCenter(resp[0].geometry.location);
        resp[0].geo = this.getAddress(resp[0]);
        this.updateForm(resp[0]);
      }
    });
  }

  private getAddress(resp){
    return {address:
      {
        country_code: getAddressName(resp.address_components, 'country', 'short_name'),
        country: getAddressName(resp.address_components, 'country'),
        locality: getAddressName(resp.address_components, 'locality'),
        region: getAddressName(resp.address_components, 'administrative_area_level_1'),
        postalCode: getAddressName(resp.address_components, 'postal_code'),
        route: getAddressName(resp.address_components, 'route'),
        street_number: getAddressName(resp.address_components, 'street_number'),
        formatted_address: resp.formatted_address
      }
    }

    function getAddressName(componentList: AddressComponent[], type: string, label = 'long_name'): string{
      const component = componentList.filter(value  => value.types.indexOf(type) > -1)[0];
      return component? component[label] : '';
    }
  }


  private updateForm(resp) {
    this.map.setZoom(17);
    const data = {
      geo: {
        label: this.map.getCenter().toUrlValue(),
        point: this.map.getCenter().toJSON(),
        address: resp.geo.address
      },
      place_id: resp.place_id
    };
    this.placeForm.patchValue(data, {onlySelf: true});
  }

}
