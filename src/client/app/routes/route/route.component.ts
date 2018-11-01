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
import { ClearSegment, SaveSegment, ToggleSegmentDialog } from '../../store/route/route.actions';
import { SegmentState } from '../../store/route/route.reducer';
import { ClearPoint, ToggleDialogPoint } from '../../store/place/place.actions';
import { DialogActions } from '../../store/dialog-actions.enum';
import { AppState } from '../../store/shared/app.interfaces';
import { getSegmentDialogStatus, getSegmentSelected, getSegmentsEntityState } from '../../store/route';
import { EventSelected } from '../../store/trip-template/event/event.actions';
import { getDialogStatus, getPointSelected } from '../../store/place';
import { ConfirmationModalComponent } from '../../shared/modal/confirmation-modal/confirmation-modal.component';
import { SnackbarOpen } from '../../store/shared/actions/snackbar.actions';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})

export class RouteComponent extends FormGuard implements OnInit, OnDestroy {

  form: FormGroup;
  bussy: boolean;
  _subscription: Subscription;
  segment = new Segment();
  amIDialog = false;
  dialogStatus: string;
  popup = false;
  _deleteSubscription: Subscription;

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
          this.router.navigate(['/routes']);
        }
      });

    this.route.data.subscribe(({segment}) => {
      if (segment) {
        this.segment = segment;
        this.placeStore.setPlace('origin', segment.origin);
        this.placeStore.setPlace('destination', segment.destination);
        this.placeStore.setWaypoints(segment.middle_points);
      }
    });

    this.form = this.fb.group({
      name: [{value: this.segment.name, disabled: true}, Validators.required],
      route_type: [this.segment.route_type, Validators.required],
      road_surface: [this.segment.road_surface, Validators.required],
      via: this.segment.via,
      description: this.segment.description,
      images: this.fb.array(this.segment.images),
      origin: [this.segment.origin, Validators.required],
      destination: [this.segment.destination, Validators.required],
      middle_points: this.fb.array(this.segment.middle_points.map(value => this.fb.group(value))),
      things_to_know: this.fb.array(this.segment.things_to_know.map(value => this.fb.group(value))),
      file: undefined,
      deleted_images: this.fb.array([]),
      legs: this.segment.legs
    });
  }

  ngOnDestroy() {
    if (this._subscription)
      this._subscription.unsubscribe();

    if (this._deleteSubscription)
      this._deleteSubscription.unsubscribe();

    this.store.dispatch(new ClearSegment());
  }

  // Form control
  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      const formData = this.prepareToSave();
      this.store.dispatch(new SaveSegment({id: this.segment._id, body: formData}));
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
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
      geo: {point: data.origin.geo.point}
    };
    data.destination = {
      name: data.destination.name,
      type: data.destination.type,
      _id: data.destination._id,
      geo: {point: data.destination.geo.point}
    };
    data.middle_points = data.middle_points
      .map(value => ({
        name: value.name,
        type: value.type,
        _id: value._id,
        geo: {point: value.geo.point}
      }));
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

}
