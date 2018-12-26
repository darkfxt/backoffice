import { ChangeDetectorRef, Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PlaceService } from '../../../shared/services/place.service';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { Place } from '../../../shared/models/Place';

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
    const place = event.option.value;
    this.placeStore.setPlace(inputName, place);
    this.options = [];
    if (this.routeGroup.get('origin').value.name && this.routeGroup.get('destination').value.name)
      this.routeGroup.patchValue({name: `${this.routeGroup.get('origin').value.name} to ${this.routeGroup.get('destination').value.name}`});
  }

  search(event) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch) {
      return false;
    }

    this.lastSearch = event.target.value;
    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.placeService.search(`q=${event.target.value}`).subscribe(resp => {
        this.options = this.createGroups(resp);
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
}
