import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';
import { PlaceType } from '../../../shared/models/enum/PlaceType';

@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit {

  @Input('headGroup')
  placeForm: FormGroup;

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI')},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL')},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY')},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL')},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION')},
  ];

  constructor() { }

  ngOnInit() {
  }

}
