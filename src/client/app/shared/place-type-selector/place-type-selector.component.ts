import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TRANSLATE } from '../../translate-marker';
import { PlaceType } from '../models/enum/PlaceType';
import { eventColors } from '../models/TripTemplate';

@Component({
  selector: 'app-place-type-selector',
  templateUrl: './place-type-selector.component.html',
  styleUrls: ['./place-type-selector.component.scss']
})
export class PlaceTypeSelectorComponent implements OnInit {

  eventColors = eventColors;

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI'), enabled: false, icon: 'photo_camera'},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL'), enabled: false, icon: 'hotel'},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY'), enabled: false, icon: 'local_activity'},
    // {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL'), enabled: false, icon: ''},
    // {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION'), enabled: false, icon: ''},
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
