import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() set disabledRoutes(routeTypes: Array<string>) {
    if (routeTypes) {
      if (routeTypes.length > 0)
        this.disableRouteMode(routeTypes);
      else {
        this.routeTypes.map((travelMode) => {
          travelMode.enabled = true;
        });
      }
    }
  }

  @Output()
  routeTypeChanged: EventEmitter<any> = new EventEmitter<any>();


  routeTypes = [
    {
      value: TRANSLATE('driving'),
      viewValue: 'Driving',
      enabled: true
    },
    {
      value: TRANSLATE('walking'),
      viewValue: 'Walking',
      enabled: true
    },
    {
      value: TRANSLATE('bicycling'),
      viewValue: 'Bicycling',
      enabled: true
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

  disableRouteMode(routeModes: Array<string>) {
    this.routeTypes.map((travelMode) => {
        if (routeModes.includes(travelMode.value))
          travelMode.enabled = false;
      });
  }

}
