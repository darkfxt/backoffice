import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../../shared/services/routes.service';
import { FormGuard, IFormGuard } from '../../shared/form-guard/form-guard';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ModalService } from '../../shared/modal/modal.service';
import Segment from '../../shared/models/Segment';
import { PlaceStore } from '../../shared/services/place-store.services';
import { PointComponent } from '../../places/point/point.component';
import { EventDialogComponent } from '../../trip-templates/trip-template-detail/trip-template-itinerary/event-dialog/event-dialog.component';
import { select, Store } from '@ngrx/store';
import {ClearSegment, ErrorSavingSegment, SaveSegment, ToggleSegmentDialog} from '../../store/route/route.actions';
import { SegmentState } from '../../store/route/route.reducer';
import { ClearPoint, ToggleDialogPoint } from '../../store/place/place.actions';
import { DialogActions } from '../../store/dialog-actions.enum';
import { AppState } from '../../store/shared/app.interfaces';
import { getSegmentDialogStatus, getSegmentSelected, getSegmentsEntityState, getSegmentsErrors } from '../../store/route';
import { EventSelected } from '../../store/trip-template/event/event.actions';
import { getDialogStatus, getPointSelected } from '../../store/place';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { ApiError } from '../../shared/models/ApiError';
import {BikingCountryAvailability} from '../../shared/models/enum/BikingCountryAvailability';
import {TRANSLATE} from '../../translate-marker';

const ERROR_ROUTE_NAME_REGEX = /^.*Place with name.*and via.*already exist.$/g;

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})

export class RouteComponent extends FormGuard implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  _subscription: Subscription;
  _placeStoreSubscription: Subscription;
  segment = new Segment();
  amIDialog = false;
  dialogStatus: string;
  popup = false;
  travelModeStatus = false;
  _errorSubscription: Subscription;
  _deleteSubscription: Subscription;
  _selectedRouteType: string;
  _disabledModesOfTravel: Array<any> = [];
  _languageSelected: string;
  defaultLanguage = localStorage.getItem('uiLanguage') || navigator.language.split('-')[0];
  stepper = {
    header: true,
    cover: true,
    map: false,
    ttk: true
  };


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routesService: RoutesService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private placeStore: PlaceStore,
    private daDialog: MatDialog,
    modalService: ModalService
  ) {
    super(daDialog, modalService);
  }
  ngOnInit() {

    this.store.pipe(
      select(getSegmentDialogStatus)
    ).subscribe(dialogStatus => {
      this.dialogStatus = dialogStatus;
      if (dialogStatus === 'true') this.popup = true;
    });

    this._subscription = this.store.select(getSegmentSelected)
      .subscribe( (selectedSegment: any) => {
        if (selectedSegment && selectedSegment._id !== 'new' && selectedSegment._id !== undefined) {
          if (this.dialogStatus === 'true') {
            this.store.dispatch(new EventSelected({_id: selectedSegment._id, type: 'SEGMENT'}));
            setTimeout(() => this.store.dispatch(new ToggleSegmentDialog(DialogActions.CLOSE)), 1000);
            return;
          }
          // if (this._subscription)
          //   this._subscription.unsubscribe();
          // if (this._placeStoreSubscription) {
          //   this.placeStore.clearAll();
          //   this._placeStoreSubscription.unsubscribe();
          // }
          this.store.dispatch(new ClearSegment());
          setTimeout(() => this.router.navigate(['/routes']));
        }
      });

    this._placeStoreSubscription = this.route.data.subscribe(({segment}) => {
      if (segment) {
        this.segment = segment;
        this.placeStore.setPlace('origin', segment.origin);
        this.placeStore.setPlace('destination', segment.destination);
        this.placeStore.setWaypoints(segment.middle_points);
      }
    });
    this._languageSelected = this.segment.default_lang;
    this.form = this.fb.group({
      name: [{value: this.segment.name, disabled: true}, Validators.required],
      route_type: [{value: this.segment.route_type, disabled: !this.segment.name}, Validators.required],
      road_surface: [{value: this.segment.road_surface, disabled: !this.segment.name}, Validators.required],
      via: this.segment.via,
      description: [{value: this.segment.description, disabled: !this._languageSelected}],
      images: this.fb.array(this.segment.images),
      origin: [this.segment.origin, Validators.required],
      destination: [this.segment.destination, Validators.required],
      middle_points: this.fb.array(this.segment.middle_points.map(value => this.fb.group(value))),
      things_to_know: this.fb.array(this.segment.things_to_know.map(value => this.fb.group(value))),
      file: undefined,
      deleted_images: this.fb.array([]),
      legs: this.segment.legs,
      default_lang: this.segment.default_lang || ''
    });
  }

  ngOnDestroy() {
    if (this._subscription)
      this._subscription.unsubscribe();

    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();

    if (this._placeStoreSubscription) {
      this.placeStore.clearAll();
      this._placeStoreSubscription.unsubscribe();
    }
    this.store.dispatch(new ClearSegment());
  }

  // Form control
  onSubmit() {
    if (this.form.valid) {
      this._errorSubscription = this.store.select(getSegmentsErrors)
        .subscribe((APIError: ApiError) => {
          if (APIError)
            if (ERROR_ROUTE_NAME_REGEX.test(APIError.response.message)) {

              const viaControl = this.form.get('via');
              markAsTtouched(viaControl);
              viaControl.setErrors({'invalid': true});
            }
        });
      this.bussy = true;
      const formData = this.prepareToSave();
      this.store.dispatch(new SaveSegment({id: this.segment._id, body: formData}));
    } else
      this.store.dispatch(new SnackbarOpen(
        {message: TRANSLATE('Faltan completar campos, verificar')}
      ));
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        markAsTtouched(control);
      });

    function markAsTtouched(control) {
      if (control.controls && control.controls.length)
        return control.controls.forEach(subControl => markAsTtouched(subControl));
      control.markAsTouched({onlySelf: true});
    }
  }

  private prepareToSave(): FormData {
    const formData = new FormData();
    const data = Object.assign({}, this.form.value);
    data.name = `${data.origin.name} to ${data.destination.name}`;
    data.origin = {
      name: data.origin.name,
      type: data.origin.type,
      _id: data.origin._id,
      place_id: data.origin.place_id,
      geo: {point: data.origin.geo.point,
            address: data.origin.geo.address},
      images: data.origin.images || []
    };
    data.destination = {
      name: data.destination.name,
      type: data.destination.type,
      _id: data.destination._id,
      place_id: data.destination.place_id,
      geo: {point: data.destination.geo.point,
        address: data.destination.geo.address},
      images: data.destination.images || []
    };
    data.middle_points = data.middle_points
      .map(value => ({
        name: value.name,
        type: value.type,
        _id: value._id,
        geo: {point: value.geo.point}
      }));
    data.default_lang = data.default_lang;
    formData.append('data', JSON.stringify(data));
    const image = data.file;
    if (image) {
      formData.append('files[]', image, image.name);
    }
    return formData;
  }

  goBack() {
    if (this.popup)
      this.store.dispatch(new ToggleSegmentDialog(DialogActions.CLOSE));
    else
      this.router.navigate(['/routes']);
  }

  deleteRoute() {

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `Deseas eliminar ${this.segment.name}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.daDialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this._deleteSubscription = this.routesService.deleteById(this.segment._id).subscribe(resp => {
          this.store.dispatch(new SnackbarOpen(
            {message: `${this.segment.name} ha sido eliminado`}
          ));
          this.router.navigate(['/routes']);
        });
    });
  }

  onSelectionTypeChanged(event) {
    this._selectedRouteType = event;
  }

  onDisableTravelMode(event) {
    // this._disabledModesOfTravel.push(event);
    let arrayOfDisabledModes: Array<string> = this._disabledModesOfTravel.slice();
    if (event == null)
      arrayOfDisabledModes = [];
    else
      arrayOfDisabledModes.push(event);

    this._disabledModesOfTravel = arrayOfDisabledModes;
  }

  toggleTravelMode(event) {
    this.form.get('route_type').enable();
    this.form.get('road_surface').enable();
    const originCountry = this.form.get('origin').value.geo.address.country_code;
    const destinationCountry = this.form.get('destination').value.geo.address.country_code;
    // Check this: enable or disable biking option relying on country of the selected place
    if (
      !Object.keys(BikingCountryAvailability).includes(originCountry) ||
      !Object.keys(BikingCountryAvailability).includes(destinationCountry)) {
      this.onDisableTravelMode('bicycling');
    }
  }

  setStep(step) {
    Object.keys(this.stepper).forEach(field => {
      this.stepper[field] = true;
    });
    this.stepper[step] = false;
    window.scroll(0, 0);
  }

}
