import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PlaceService } from '../../../shared/services/place.service';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { Place } from '../../../shared/models/Place';
import { BikingCountryAvailability } from '../../../shared/models/enum/BikingCountryAvailability';
import { Geo } from '../../../shared/models/Geo';
import { IAddress } from '../../../shared/models/Address';
import { ICoordinates } from '../../../shared/models/Coordinates';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/shared/app.interfaces';
import { ToggleDialogPoint } from '../../../store/place/place.actions';
import { DialogActions } from '../../../store/dialog-actions.enum';
import { PointComponent } from '../../../places/point/point.component';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { getDialogStatus, getPointSelected } from '../../../store/place';
import { EventSelected, TerminalSelected } from '../../../store/trip-template/event/event.actions';

@Component({
  selector: 'app-route-points',
  templateUrl: './route-points.component.html',
  styleUrls: ['./route-points.component.scss']
})
export class RoutePointsComponent implements OnInit {

  @Input()
  routeGroup: FormGroup;
  dialogReferenceSub: any;
  autocompleteTimeout;
  options: any[];
  lastSearch: any = {};
  lastSelection: any = {};
  lastOrigin = '';
  lastDestination = '';
  acLoading = false;
  dialogStatus$: Observable<any>;
  _subscription: Subscription;
  indexn: number;
  enablePrivateCreation = false;

  @Output()
  travelModeDisabled: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  minimalRouteReached: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder,
              public dialog: MatDialog,
              private placeService: PlaceService,
              private placeStore: PlaceStore,
              private ref: ChangeDetectorRef,
              private store: Store<AppState>,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.dialogStatus$ = this.store.pipe(select(getDialogStatus));

    this._subscription = this.store.select(getPointSelected)
      .subscribe((selectedPoint: any) => {
        if (selectedPoint && selectedPoint._id !== 'new' && selectedPoint._id !== undefined) {
          if (this.indexn || this.indexn !== undefined) {
            this.setMiddlePoint({option: {value: {_id: selectedPoint._id, type: 'private'}}}, this.indexn);
          }
        }
      });

    this.dialogStatus$.subscribe((data: any) => {
      if (data && data === 'close') {
        if (this.dialogReferenceSub)
          this.dialogReferenceSub.close();
        this.store.dispatch(new ToggleDialogPoint(DialogActions.FALSE));
      }
    });
    this.placeStore.getLocation().subscribe((place) => {
      if (!place || (this.indexn !== undefined))
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
    if (event.option.value) {
      this.placeService.getAutocompleteDetail(event.option.value).subscribe((gPlace) => {
        const place: Place = this.gPlaceTransformer(gPlace, event.option.value.place_id, event.option.value.type);
        this.lastSelection['input-' + index] = place;
        this.lastSearch['input-' + index] = place.name;
        this.middlePoints.controls[index].patchValue(place);
        setTimeout(() => this.placeStore.setWaypoints(this.middlePoints.value), 0);

      });
    }
  }

  createPrivate(index) {
    const dialogConfig = {
      height: '80%',
      width: '80%',
      id: 'eventDialog',
      panelClass: 'eventDialogPanel',
      data: {
        dialog: 'select'
      },
      disableClose: true,
      closeOnNavigation: true
    };
    this.indexn = index;
    this.store.dispatch(new ToggleDialogPoint('fromRoutes'));
    this.dialogReferenceSub = this.dialog.open(PointComponent, dialogConfig);
    this.dialogReferenceSub.afterClosed().subscribe(res => {
      this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE));
    });
  }

  setPoint(event, inputName) {

    this.placeService.getAutocompleteDetail(event.option.value).subscribe((gPlace) => {
      const place: Place = this.gPlaceTransformer(gPlace, event.option.value.place_id, event.option.value.type);
      this.placeStore.setPlace(inputName, place);
      this.lastSelection[inputName] = place;
      this.lastSearch[inputName] = place.name;
      this.options = [];
      this.routeGroup.patchValue({[inputName]: place});
      if (this.routeGroup.get('origin').value.name && this.routeGroup.get('destination').value.name) {
        this.routeGroup.patchValue({name: `${this.routeGroup.get('origin').value.name} to ${this.routeGroup.get('destination').value.name}`});
        this.minimalRouteReached.emit(true);
      }
    });
  }

  //


  search(event, control) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch) {
      return false;
    }
    this.acLoading = true;
    this.lastSearch[control] = event.target.value;
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

  searchPrivates(event, control) {
    if (event.target.value.length < 3 || event.target.value === this.lastSearch || event.code === 'ArrowDown' || event.code === 'ArrowUp') {
      return false;
    }
    this.acLoading = true;
    this.lastSearch[control] = event.target.value;
    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.placeService.search(`search=${event.target.value}`).subscribe(resp => {
          this.options = this.createGroups(resp);
          this.travelModeDisabled.emit(null);
          this.enablePrivateCreation = true;
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

  private gPlaceTransformer(gPlace: any, googleId: string, type: string): Place {
    const alterPlace: Place = new Place();
    const address: IAddress = gPlace.geo.address;
    const point: ICoordinates = gPlace.geo.point;
    const alterGeo: Geo = new Geo({address, point});
    alterPlace.description = gPlace.description;
    alterPlace.name = gPlace.name;
    alterPlace.geo = alterGeo;
    alterPlace.type = gPlace.type;
    if (type === 'public') alterPlace.place_id = googleId;
    else alterPlace._id = gPlace._id || gPlace.id;
    alterPlace.images = gPlace.images;
    return alterPlace;
  }

  onLeave(event, inputName) {
    if (this.lastSearch[inputName] === event.target.value) {
      return;
    }
    if (this.lastSelection[inputName]) {
      const $elem = this.renderer.selectRootElement(`#${event.target.id}`);
      setTimeout(() => {
        this.renderer.setProperty($elem, 'value', this.lastSearch[inputName]);
        this.ref.detectChanges();
      }, 100);
    } else {
      const $elem = this.renderer.selectRootElement(`#${event.target.id}`);
      setTimeout(() => {
        this.renderer.setProperty($elem, 'value', '');
        this.enablePrivateCreation = false;
        this.ref.detectChanges();
      }, 100);
    }
  }
}
