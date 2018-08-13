import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RoutesService} from '../../shared/services/routes.service';
import {FormGuard, IFormGuard} from '../../shared/form-guard/form-guard';
import {MatDialog} from '@angular/material';
import {ModalService} from '../../shared/modal/modal.service';
import Segment from '../../shared/models/Segment';
import {PlaceStore} from '../../shared/services/place-store.services';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})

export class RouteComponent extends FormGuard implements OnInit, OnDestroy{

  form: FormGroup;
  bussy: boolean;
  _subsription: Subscription;
  segment = new Segment();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routesService: RoutesService,
    private route: ActivatedRoute,
    private placeStore: PlaceStore,
    dialog: MatDialog,
    modalService: ModalService
  ) {
    super(dialog, modalService);
  }

  ngOnInit() {

    this.route.data.subscribe(({ segment }) => {
      if(segment){
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

  ngOnDestroy(){
    if(this._subsription)
      this._subsription.unsubscribe();
  }

  // Form control
  onSubmit() {
    if(this.form.valid) {
      this.bussy = true;
      const formData = this.prepareToSave();
      const method = (this.segment._id === '')? 'create':'update';
      this._subsription = this.routesService[method]({id: this.segment._id, body: formData}).subscribe((resp) => {
        this.router.navigate(['/routes']);
      });
    }else{
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
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
    if (image)
      formData.append('files[]', image, image.name);
    return formData;
  }

}
