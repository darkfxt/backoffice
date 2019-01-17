import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/shared/app.interfaces';
import {ContentService} from '../../../shared/services/content.service';
import {HideLoader, ShowLoader} from '../../../store/shared/actions/loader.actions';

@Component({
  selector: 'app-route-head',
  templateUrl: './route-head.component.html',
  styleUrls: ['./route-head.component.scss']
})
export class RouteHeadComponent implements OnInit {

  availableLanguages: Array<string>;
  defaultLanguage: string;
  tabController = {};

  @Input()
  form: FormGroup;

  routeTypes = [
    {
      value: TRANSLATE('driving'),
      viewValue: 'Driving'
    },
    {
      value: TRANSLATE('walking'),
      viewValue: 'Walking'
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

  constructor(
    private contentServiceInstance: ContentService,
    private store: Store<AppState>
  ) {
    this.defaultLanguage = localStorage.getItem('uiLanguage') || navigator.language.split('-')[0] || 'en';
    this.tabController[this.defaultLanguage] = '';
  }

  ngOnInit() {
    const parentTranslations = Object.assign({}, this.form.value.description);
    Object.keys(parentTranslations).forEach((key) => (parentTranslations[key] === '') && delete parentTranslations[key]);
    this.contentServiceInstance.getAvailableLanguages()
      .subscribe((resp) => {
        this.availableLanguages = resp.filter((lng) => lng !== this.defaultLanguage).slice();
        Object.assign(this.tabController, parentTranslations);
        this.availableLanguages = this.availableLanguages.filter(lng => !Object.keys(this.tabController).includes(lng));
      });
  }

  getLanguages() {
    return Object.keys(this.tabController);
  }

  getTranslation(target_lng) {
    const text = this.form.value.description[this.defaultLanguage];
    const translations = Object.assign({}, this.form.value.description);
    this.store.dispatch(new ShowLoader());
    this.contentServiceInstance.getTranslation(this.defaultLanguage, target_lng, text)
      .subscribe((response) => {
          translations[target_lng] = response.translation;
          this.form.controls['description'].setValue(translations);
          Object.keys(translations).forEach((key) => (translations[key] === '') && delete translations[key]);
          this.tabController = Object.assign({}, translations);
          this.availableLanguages = this.availableLanguages.filter(lng => !Object.keys(this.tabController).includes(lng));
          this.store.dispatch(new HideLoader());
        },
        (error) => {
          console.error(error);
          this.store.dispatch(new HideLoader());
        });
  }

}
