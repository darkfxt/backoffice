import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TRANSLATE } from '../../translate-marker';
import { PlaceType } from '../models/enum/PlaceType';
import { eventColors } from '../models/TripTemplate';

export interface IFilterTypeDistance {
  types: Array<any>;
  distance: number;
}

@Component({
  selector: 'app-place-type-selector',
  templateUrl: './place-type-selector.component.html',
  styleUrls: ['./place-type-selector.component.scss']
})

export class PlaceTypeSelectorComponent implements OnInit {

  eventColors = eventColors;
  sliderValue = 20;

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI'), enabled: false, icon: 'photo_camera'},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL'), enabled: false, icon: 'hotel'},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY'), enabled: false, icon: 'local_activity'},
    // {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL'), enabled: false, icon: ''},
    // {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION'), enabled: false, icon: ''},
  ];
  @Input() enabledIcons = false;
  @Output() selectedTypes: EventEmitter<IFilterTypeDistance> = new EventEmitter<IFilterTypeDistance>();

  constructor() { }

  ngOnInit() {
  }

  onSelectionChanged(event) {
    this.toggleElement(event);
    this.emitEvent();
  }

  private emitEvent() {
    this.selectedTypes.emit({types: this.pointTypes.filter(pType => pType.enabled), distance: this.sliderValue});
  }

  toggleElement(element) {
    const elementIndex = this.pointTypes.map(pt => pt.value).indexOf(element);
    this.pointTypes[elementIndex].enabled = !this.pointTypes[elementIndex].enabled;
  }

  onSliderChange(event) {
    if (event && event.value) this.sliderValue = event.value;
    this.emitEvent();
  }

}
