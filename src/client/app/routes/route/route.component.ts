import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tg-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  routeForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.routeForm = this.fb.group({
      name: ['', Validators.required],
      route_type: ['', Validators.required],
      road_type: ['', Validators.required],
      via: '',
      description: '',
      images: null,
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      middle_points: this.fb.array([])
    });
  }

  onSubmit(){
    console.log(this.routeForm.value);
  }

}
