import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {RoutesService} from '../../shared/services/routes.service';

@Component({
  selector: 'app-tg-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit, OnDestroy {

  routeForm: FormGroup;
  bussy: boolean;
  _subsription: Subscription;
  constructor(private fb: FormBuilder, private router: Router, private routesService: RoutesService) { }

  ngOnInit() {
    this.routeForm = this.fb.group({
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
      files: undefined,
      deleted_images: undefined
    });
  }

  ngOnDestroy(){
    if(this._subsription)
      this._subsription.unsubscribe();
  }

  // Form control
  onSubmit() {
    if(this.routeForm.valid) {
      this.bussy = true;
      const formData = this.prepareToSave();
      this._subsription = this.routesService.addRoute(formData).subscribe((resp) => {
        this.router.navigate(['/routes']);
      }, err => {

      });
    }else{
      Object.keys(this.routeForm.controls).forEach(field => {
        const control = this.routeForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  private prepareToSave(): FormData {
    const formData = new FormData();
    const data = this.routeForm.value;
    formData.append('data', JSON.stringify(data));
    const image = data.file;
    if (image)
      formData.append('file', image, image.name);
    return formData;
  }

}
