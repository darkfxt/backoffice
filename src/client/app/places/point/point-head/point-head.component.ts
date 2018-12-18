import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';
import {PlaceType} from '../../../shared/models/enum/PlaceType';

@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit {

  @Input('headGroup')
  placeForm: FormGroup;

  pointTypes = [
    {value: PlaceType.CITY, viewValue: TRANSLATE('CITY')},
    {value: PlaceType.COUNTRY, viewValue: TRANSLATE('COUNTRY')},
    {value: PlaceType.CONTINENT, viewValue: TRANSLATE('CONTINENT')},
    {value: PlaceType.HIGH_LEVEL_REGION, viewValue: TRANSLATE('HIGH_LEVEL_REGION')},
    {value: PlaceType.METRO_STATION, viewValue: TRANSLATE('METRO_STATION')},
    {value: PlaceType.PROVINCE_STATE, viewValue: TRANSLATE('PROVINCE_STATE')},
    {value: PlaceType.MULTI_CITY_VICINITY, viewValue: TRANSLATE('MULTI_CITY_VICINITY')},
    {value: PlaceType.POI, viewValue: TRANSLATE('POI')},
    {value: PlaceType.NEIGHBORHOOD, viewValue: TRANSLATE('NEIGHBORHOOD')},
    {value: PlaceType.TRAIN_STATION, viewValue: TRANSLATE('TRAIN_STATION')},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL')},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY')},
    {value: PlaceType.AIRPORT, viewValue: TRANSLATE('AIRPORT')},
    {value: PlaceType.HIGHLIGHT, viewValue: TRANSLATE('HIGHLIGHT')},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL')},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION')},
    {value: PlaceType.WAYPOINT, viewValue: TRANSLATE('WAYPOINT')}
  ];

  constructor() { }

  ngOnInit() {
  }

}
