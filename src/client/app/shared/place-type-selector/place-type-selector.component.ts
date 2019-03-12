import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TRANSLATE } from '../../translate-marker';
import { PlaceType } from '../models/enum/PlaceType';

@Component({
  selector: 'app-place-type-selector',
  templateUrl: './place-type-selector.component.html',
  styleUrls: ['./place-type-selector.component.scss']
})
export class PlaceTypeSelectorComponent implements OnInit {

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI'), enabled: false, icon: '/assets/icons/point_of_interest.png'},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL'), enabled: false, icon: '/assets/icons/hotel.png'},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY'), enabled: false, icon: '/assets/icons/activity.png'},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL'), enabled: false, icon: '/assets/icons/terminal.png'},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION'), enabled: false, icon: '/assets/icons/destination.png'},
  ];
  @Input() enabledIcons = false;
  @Output() selectedTypes: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(event) {
    this.toggleElement(event);
    this.selectedTypes.emit(this.pointTypes.filter(pType => pType.enabled));
  }

  toggleElement(element) {
    const elementIndex = this.pointTypes.map(pt => pt.value).indexOf(element);
    this.pointTypes[elementIndex].enabled = !this.pointTypes[elementIndex].enabled;
  }

}
