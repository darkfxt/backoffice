import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from '../../shared/services/place.service';
import { ActivatedRoute, Router } from '@angular/router';
import Place from '../../../../server/api/entity/Place';
import { Observable, Subscription } from 'rxjs';
import { FormGuard } from '../../shared/form-guard/form-guard';
import { MatDialog } from '@angular/material';
import { ModalService } from '../../shared/modal/modal.service';
import { select, Store } from '@ngrx/store';
import { ClearPoint, SavePoint, ToggleDialogPoint } from '../../store/place/place.actions';
import { DialogActions } from '../../store/dialog-actions.enum';
import { AppState } from '../../store/shared/app.interfaces';
import { getDialogStatus, getPointSelected, getPointsEntity } from '../../store/place';
import { PlaceStore } from '../../shared/services/place-store.services';
import { EventSelected, TerminalSelected, RemoveEvent } from '../../store/trip-template/event/event.actions';
import { getSelectedDriving } from '../../store/trip-template';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.scss']
})
export class PointComponent extends FormGuard implements OnInit, OnDestroy {

  placeForm: FormGroup;
  place: Place = new Place();
  _subscription: Subscription;
  _resolverSubscription: Subscription;
  _getDetailSubscription: Subscription;
  _deleteSubscription: Subscription;
  bussy: boolean;
  amIDialog = 'false';
  popup = false;
  private autocompleteTimeout;
  private lastSearch;
  options: Observable<any[]>;
  dialogStatus: string;
  drivingStatus: string;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private matDialog: MatDialog,
    modalService: ModalService,
    private placeStore: PlaceStore
  ) {
    super(matDialog, modalService);
  }

  ngOnInit() {
    let isUpdate = false;
    this.store.pipe(
      select(getDialogStatus)
    ).subscribe(dialogStatus => {
      this.dialogStatus = dialogStatus;
      if (dialogStatus === 'true') this.popup = true;
    });

    this.store.pipe(
      select(getSelectedDriving)
    ).subscribe(driving => {
      this.drivingStatus = driving;
    });

    this._subscription = this.store.select(getPointSelected)
      .subscribe( (selectedPoint: any) => {
      if (selectedPoint && selectedPoint._id !== 'new' && selectedPoint._id !== undefined) {
          if (this.dialogStatus === 'true') {
            if (this.drivingStatus) {
              this.store.dispatch(new TerminalSelected({terminal: selectedPoint}));
            } else {
              this.store.dispatch(new EventSelected({_id: selectedPoint._id, type: 'POINT'}));
            }
            setTimeout(() => this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE)), 1000);
            return;
          }

          this.router.navigate(['/places']);
      }
    });

    this._resolverSubscription = this.route.data.subscribe(({ point }) => {
      if (point && point._id !== '' && point._id !== 'new') {
        this.place = point[0];
        isUpdate = true;
      } else {
        this.place = new Place();
      }
    });

    this.placeForm = this.fb.group({
      name: [this.place.name, Validators.required],
      type: [this.place.type, Validators.required],
      description: [this.place.description],
      geo: this.fb.group({
        label: [`${this.place.geo.point.lat},${this.place.geo.point.lng}`, Validators.required],
        point: this.place.geo.point,
        address: this.fb.group({
          country_code: this.place.geo.address.country_code,
          country: this.place.geo.address.country,
          locality: this.place.geo.address.locality,
          region: this.place.geo.address.region,
          postalCode: this.place.geo.address.postalCode,
          route: this.place.geo.address.route,
          street_number: this.place.geo.address.street_number,
          formatted_address: this.place.geo.address.formatted_address
        })
      }),
      place_id: this.place.place_id,
      files: null,
      status: this.place.status,
      images: this.fb.array(this.place.images),
      deleted_images: this.fb.array([]),
      _id: this.place._id
    });

  }

  ngOnDestroy() {
    this._resolverSubscription.unsubscribe();
    if (this._subscription) {
      this.store.dispatch(new ClearPoint());
      this._subscription.unsubscribe();
    }

    if (this._getDetailSubscription)
      this._getDetailSubscription.unsubscribe();

    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();
  }

  onOptionSelected(e) {
    this.placeForm.patchValue({name: e.option.value.name.split(',')[0]});
    this._getDetailSubscription = this.placeService.getGoogleDetail(e.option.value.place_id).subscribe(resp => {
      this.placeStore.setLocation(resp);
    });
  }

  displayFn(value) {
    return value.name;
  }

  search(event) {
    if (event.code === 'Backspace' || event.target.value.length < 3 || event.target.value === this.lastSearch)
      return false;

    clearTimeout(this.autocompleteTimeout);
    this.autocompleteTimeout = setTimeout(() => {
      this.lastSearch = event.target.value;
      this.options = this.placeService.autocomplete(event.target.value);
    }, 300);

  }

  // Form control
  onSubmit() {
    if (this.placeForm.valid) {
      this.bussy = true;
      const formData = this.prepareToSave(this.placeForm.value);
      this.store.dispatch(new SavePoint({id: this.place._id, body: formData}));
    } else {
      Object.keys(this.placeForm.controls).forEach(field => {
        const control = this.placeForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  private prepareToSave(place): FormData {
    const formData = new FormData();
    formData.append('data', JSON.stringify(place));
    const images = place.files;
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append('files[]', images[i], images[i].name);
      }
    }
    return formData;
  }

  goBack() {
    if (this.popup)
      this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE));
    else
      this.router.navigate(['/places']);
  }

  deletePlace() {

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `Deseas eliminar ${this.place.name}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.matDialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result)
        this._deleteSubscription = this.placeService.deleteById(this.place._id).subscribe(resp => {
          this.store.dispatch(new SnackbarOpen(
            {message: `${this.place.name} ha sido eliminado`}
          ));
          this.router.navigate(['/places']);
        });
    });
  }

}
