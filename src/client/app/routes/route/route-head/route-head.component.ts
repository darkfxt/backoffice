import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';

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
      value: TRANSLATE('driving'),
      viewValue: 'Driving'
    },
    {
      value: TRANSLATE('walking'),
      viewValue: 'Walking'
    }
  ];
  roadSurfaces = [
    {
      value: TRANSLATE('PAVED'),
      viewValue: 'Paved'
    },
    {
      value: TRANSLATE('GRAVEL'),
      viewValue: 'Gravel'
    },
    {
      value: TRANSLATE('MIXED'),
      viewValue: 'Mixed'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
