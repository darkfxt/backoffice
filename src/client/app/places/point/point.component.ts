import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService } from '../../shared/services/place.service';
import { ActivatedRoute, Router } from '@angular/router';
import Place from '../../../../server/api/entity/Place';
import { Subscription } from 'rxjs';
import { FormGuard } from '../../shared/form-guard/form-guard';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalService } from '../../shared/modal/modal.service';
import { AppState, pointSelector } from '../../store';
import { EventSelected } from '../../store/trip-template/trip-template.actions';
import { Store } from '@ngrx/store';
import { ClearPoint, SavePoint, ToggleDialogPoint } from '../../store/place/place.actions';
import { DialogActions } from '../../store/dialog-actions.enum';

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
  bussy: boolean;
  amIDialog = false;

  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    matDialog: MatDialog,
    modalService: ModalService,
    public snackBar: MatSnackBar
  ) {
    super(matDialog, modalService);
  }

  ngOnInit() {
    let isUpdate = false;
    this._subscription = this.store.select(pointSelector).subscribe((storePoint: any) => {

      if (storePoint && storePoint.pointSelected && storePoint.pointSelected._id
        && storePoint.pointSelected._id !== 'new' && !this.place._id && storePoint.dialog !== DialogActions.TRUE)
        this.router.navigate([`/places/${storePoint.pointSelected._id}`]);

      if (storePoint && storePoint.dialog === DialogActions.TRUE) {
        this.amIDialog = true;
        if (storePoint.pointSelected)
          this.store.dispatch(new EventSelected(storePoint.pointSelected));
      }
      this.bussy = (storePoint && storePoint.loading) ? storePoint.loading : false;
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
      description: [this.place.description, Validators.required],
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
  }

  // Form control
  onSubmit() {
    if (this.placeForm.valid) {
      this.bussy = true;
      const formData = this.prepareToSave(this.placeForm.value);
      this.store.dispatch(new SavePoint({id: this.place._id, body: formData}));
      this.snackBar.open('Place saved', undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      // this._subscription = this.placeService.addPlace(formData).subscribe((resp) => {
      //   this.placeForm.reset();
      //   this.router.navigate(['/places']);
      // }, err => {
//
      // });
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
    if (this.amIDialog)
      this.store.dispatch(new ToggleDialogPoint(DialogActions.CLOSE));
    else
      this.router.navigate(['/places']);
  }

}
