import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PlaceService } from '../../../shared/services/place.service';
import { Observable, Subscription } from 'rxjs';
import { PlaceStore } from '../../../shared/services/place-store.services';
import { TRANSLATE } from '../../../translate-marker';


@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit {

  @Input('headGroup')
  placeForm: FormGroup;

  pointTypes = [
    {value: 'POI', viewValue: TRANSLATE('POI')},
    {value: 'HOTEL', viewValue: TRANSLATE('HOTEL')},
    {value: 'ACTIVITY', viewValue: TRANSLATE('ACTIVITY')},
    {value: 'TERMINAL', viewValue: TRANSLATE('TERMINAL')},
    {value: 'REFERENCE', viewValue: TRANSLATE('REFERENCE')}
  ];

  constructor() { }

  ngOnInit() {
  }

}
