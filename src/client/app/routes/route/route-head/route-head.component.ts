import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';
import { ContentService } from '../../../shared/services/content.service';

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
  languages = [];
  languageSelected: string;


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

  constructor(private contentServiceInstance: ContentService) { }

  ngOnInit() {
    this.contentServiceInstance.getAvailableLanguages()
      .subscribe((resp) => {
        this.languages = resp.slice();
      });
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

  onLanguageChanged(event) {
    if(event) {
      this.languageSelected = event.value;
      this.form.get('description').enable();
    }
  }

}
