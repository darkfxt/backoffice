import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-route-head',
  templateUrl: './route-head.component.html',
  styleUrls: ['./route-head.component.scss']
})
export class RouteHeadComponent implements OnInit {

  @Input()
  form: FormGroup;

  routeTypes = [
    {
      value: 'DRIVING',
      viewValue: 'Driving'
    },
    {
      value: 'WALKING',
      viewValue: 'Walking'
    }
  ];
  roadSurfaces = [
    {
      value: 'PAVED',
      viewValue: 'Paved'
    },
    {
      value: 'GRAVEL',
      viewValue: 'Gravel'
    },
    {
      value: 'MIXED',
      viewValue: 'Mixed'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
