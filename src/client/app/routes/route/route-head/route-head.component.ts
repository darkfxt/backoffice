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

  @Output()
  routeTypeChanged: EventEmitter<any> = new EventEmitter<any>();
  languages = [];
  languageSelected: string;

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

  onLanguageChanged(event) {
    if(event) {
      this.languageSelected = event.value;
      this.form.get('description').enable();
    }
  }

}
