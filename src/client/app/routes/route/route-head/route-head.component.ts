import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  routeTypeChanged: EventEmitter<any> = new EventEmitter<any>();


  routeTypes = [
    {
      value: TRANSLATE('driving'),
      viewValue: 'Driving'
    },
    {
      value: TRANSLATE('walking'),
      viewValue: 'Walking'
    },
    {
      value: TRANSLATE('bycicling'),
      viewValue: 'Bycicling'
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

  optionChanged(event) {
    if (event.isUserInput) {
      this.routeTypeChanged.emit(event.source.value);
    }
  }

}
