import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {RoutesService} from '../../shared/services/routes.service';
import {FormGuard, IFormGuard} from '../../shared/form-guard/form-guard';
import {MatDialog} from '@angular/material';
import {ModalService} from '../../shared/modal/modal.service';

@Component({
  selector: 'app-tg-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})

export class RouteComponent extends FormGuard implements OnInit, OnDestroy{

  form: FormGroup;
  bussy: boolean;
  _subsription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private routesService: RoutesService,
    dialog: MatDialog,
    modalService: ModalService
  ) {
    super(dialog, modalService);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [{value: '', disabled: true}, Validators.required],
      route_type: ['', Validators.required],
      road_surface: ['', Validators.required],
      via: '',
      description: '',
      image: undefined,
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      middle_points: this.fb.array([]),
      things_to_know: this.fb.array([]),
      file: undefined,
      deleted_images: this.fb.array([]),
      legs: ''
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
      this._subsription = this.routesService.addRoute(formData).subscribe((resp) => {
        this.router.navigate(['/routes']);
      }, err => {

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
    data.name = `${data.origin.name} to ${data.destination.name}`
    data.origin = data.origin._id;
    data.destination = data.destination._id;
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
