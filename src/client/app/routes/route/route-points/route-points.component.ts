import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PlaceService } from '../../../shared/services/place.service';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { Place } from '../../../shared/models/Place';
import { BikingCountryAvailability } from '../../../shared/models/enum/BikingCountryAvailability';
import { Geo } from '../../../shared/models/Geo';
import { IAddress } from '../../../shared/models/Address';
import { ICoordinates } from '../../../shared/models/Coordinates';

@Component({
  selector: 'app-route-points',
  templateUrl: './route-points.component.html',
  styleUrls: ['./route-points.component.scss']
})
export class RoutePointsComponent implements OnInit {

  @Input()
  routeGroup: FormGroup;

  autocompleteTimeout;
  options: any[];
  lastSearch = '';
  lastSelection = {};
  acLoading = false;

  @Output()
  travelModeDisabled: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  minimalRouteReached: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
              private placeService: PlaceService,
              private placeStore: PlaceStore,
              private ref: ChangeDetectorRef,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.placeStore.getLocation().subscribe((place) => {
      if (!place)
        return false;

      this.addPoint(place, false);
      this.ref.detectChanges();

      const $elem = this.renderer.selectRootElement(`#input-${this.middlePoints.controls.length - 1}`);
      setTimeout(() => {
        this.renderer.setProperty($elem, 'value', place.name);
        this.ref.detectChanges();
      }, 100);
    });
  }

  displayFn(value) {
    return value.name;
  }

  addPoint(place = {}, focusIn = true) {
    place = new Place(place);
    this.middlePoints.push(this.fb.group(place));
    if (focusIn) {
      setTimeout(() => {
        this.renderer.selectRootElement(`#input-${this.middlePoints.controls.length - 1}`).focus();
      }, 100);
    }
  }

  get middlePoints(): FormArray {
    return this.routeGroup.get('middle_points') as FormArray;
  }

  deletePoint(type, index) {
    this.middlePoints.removeAt(index);
    this.placeStore.setWaypoints(this.middlePoints.value);
    this.ref.detectChanges();
  }

  setMiddlePoint(event, index) {
    this.middlePoints.controls[index].patchValue(event.option.value);
    this.placeStore.setWaypoints(this.middlePoints.value);
  }

  setPoint(event, inputName) {

    this.placeService.getAutocompleteDetail(event.option.value).subscribe((gPlace) => {
      const place: Place = this.gPlaceTransformer(gPlace, event.option.value.place_id);
      this.placeStore.setPlace(inputName, place);
      this.lastSelection = place;
      this.lastSearch = place.name;
      this.options = [];
      this.routeGroup.patchValue({[inputName]: place});
      if (this.routeGroup.get('origin').value.name && this.routeGroup.get('destination').value.name) {
        this.routeGroup.patchValue({name: `${this.routeGroup.get('origin').value.name} to ${this.routeGroup.get('destination').value.name}`});
        this.minimalRouteReached.emit(true);
      }
    });
  }
    //


  search(event) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch) {
      return false;
    }
    this.acLoading = true;
    // this.lastSearch = event.target.value;
    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.placeService.improvedAutocomplete(`${event.target.value}`).subscribe(resp => {
        this.options = this.createGroups(resp);
        this.travelModeDisabled.emit(null);
        this.acLoading = false;
      },
        (err) => {
          this.acLoading = false;
        });
    }, 300);

  }

  private createGroups(list: any): any[] {
    const pointsByType = {};
    list.forEach((item) => {
      pointsByType[item.type] = pointsByType[item.type] || [];
      pointsByType[item.type].push(item);
    });
    return Object.keys(pointsByType).map(key => ({type: key, points: pointsByType[key]}));
  }

  private gPlaceTransformer(gPlace: any, googleId: string): Place {
    const alterPlace: Place = new Place();
    const address: IAddress = gPlace.geo.address;
    const point: ICoordinates = gPlace.geo.point;
    const alterGeo: Geo = new Geo({address, point});
    alterPlace.description = gPlace.description;
    alterPlace.name = gPlace.name;
    alterPlace.geo = alterGeo;
    alterPlace.type = gPlace.type;
    alterPlace._id = gPlace._id || gPlace.id || googleId;

    return alterPlace;
  }

  onLeave(event, inputName) {
    if (this.lastSearch === event.target.value) {
      return;
    }
    if (this.lastSelection) {
      const $elem = this.renderer.selectRootElement(`#${event.target.id}`);
      setTimeout(() => {
        this.renderer.setProperty($elem, 'value', this.lastSearch);
        this.ref.detectChanges();
      }, 100);
    } else {
      const $elem = this.renderer.selectRootElement(`#${event.target.id}`);
      setTimeout(() => {
        this.renderer.setProperty($elem, 'value', '');
        this.ref.detectChanges();
      }, 100);
    }
  }
}
