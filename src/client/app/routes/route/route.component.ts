import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../../shared/services/routes.service';
import { FormGuard, IFormGuard } from '../../shared/form-guard/form-guard';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { ModalService } from '../../shared/modal/modal.service';
import Segment from '../../shared/models/Segment';
import { PlaceStore } from '../../shared/services/place-store.services';
import { PointComponent } from '../../places/point/point.component';
import { EventDialogComponent } from '../../trip-templates/trip-template-detail/trip-template-itinerary/event-dialog/event-dialog.component';
import { DayIndexTypeForEventSetted, EventSelected } from '../../store/trip-template/trip-template.actions';
import { Store } from '@ngrx/store';
import { AppState, segmentSelector } from '../../store';
import { ClearSegment, SaveSegment, ToggleSegmentDialog } from '../../store/route/route.actions';
import { SegmentState } from '../../store/route/route.reducer';
import {ClearPoint, ToggleDialogPoint} from '../../store/place/place.actions';
import { DialogActions } from '../../store/dialog-actions.enum';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routesService: RoutesService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private placeStore: PlaceStore,
    daDialog: MatDialog,
    modalService: ModalService,
    public snackBar: MatSnackBar
  ) {
    super(daDialog, modalService);
  }
  ngOnInit() {

    this._subscription = this.store.select(segmentSelector).subscribe((storeSegment: any) => {
      if (storeSegment && storeSegment.segmentSelected && storeSegment.segmentSelected._id
        && storeSegment.segmentSelected._id !== 'new' && this.segment._id === '' &&
        storeSegment.dialog !== DialogActions.TRUE)
        this.router.navigate([`/routes/${storeSegment.segmentSelected._id}`]);

      if (storeSegment && storeSegment.dialog === DialogActions.TRUE) {
        this.amIDialog = true;
        if (storeSegment.segmentSelected )
          this.store.dispatch(new EventSelected(storeSegment.segmentSelected));
      }
      this.bussy = (storeSegment && storeSegment.loading) ? storeSegment.loading : false;
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

    this.store.dispatch(new ClearSegment());
  }

  // Form control
  onSubmit() {
    if (this.form.valid) {
      this.bussy = true;
      const formData = this.prepareToSave();
      const method = (this.segment._id === '') ? 'create' : 'update';
      // this._subscription = this.routesService[method]({id: this.segment._id, body: formData}).subscribe((resp) => {
      //   this.router.navigate(['/routes']);
      // });
      this.store.dispatch(new SaveSegment({id: this.segment._id, body: formData}));
      this.snackBar.open('Route saved', undefined, {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
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
    if (this.amIDialog)
      this.store.dispatch(new ToggleSegmentDialog(DialogActions.CLOSE));
    else
      this.router.navigate(['/routes']);
  }

}
