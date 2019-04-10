import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TRANSLATE } from '../../../translate-marker';
import { PlaceType } from '../../../shared/models/enum/PlaceType';
import { ContentService } from '../../../shared/services/content.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/shared/app.interfaces';
import { HideLoader, ShowLoader } from '../../../store/shared/actions/loader.actions';
import { SnackbarOpen } from '../../../store/shared/actions/snackbar.actions';
import { ConfirmationModalComponent } from '../../../shared/modal/confirmation-modal/confirmation-modal.component';
import { MatDialog } from '@angular/material';

const language = [
  TRANSLATE('en'),
  TRANSLATE('es'),
  TRANSLATE('de'),
  TRANSLATE('it'),
  TRANSLATE('fr'),
  TRANSLATE('nl'),
  TRANSLATE('pt')
];

@Component({
  selector: 'app-point-head',
  templateUrl: './point-head.component.html',
  styleUrls: ['./point-head.component.scss']
})
export class PointHeadComponent implements OnInit {

  @Input('headGroup')
  placeForm: FormGroup;
  availableLanguages: Array<string>;
  defaultLanguage: string;
  tabController = {};
  selected = new FormControl(0);

  pointTypes = [
    {value: PlaceType.POI, viewValue: TRANSLATE('POI')},
    {value: PlaceType.HOTEL, viewValue: TRANSLATE('HOTEL')},
    {value: PlaceType.ACTIVITY, viewValue: TRANSLATE('ACTIVITY')},
    {value: PlaceType.TERMINAL, viewValue: TRANSLATE('TERMINAL')},
    {value: PlaceType.DESTINATION, viewValue: TRANSLATE('DESTINATION')},
  ];

  constructor(
    private contentServiceInstance: ContentService,
    private store: Store<AppState>,
    private matDialog: MatDialog,
    ) {

    }

  ngOnInit() {
    this.defaultLanguage = this.placeForm.value.default_lang || localStorage.getItem('uiLanguage') || navigator.language.split('-')[0] || 'en';
    this.tabController[this.defaultLanguage] = '';
    const parentTranslations = Object.assign({}, this.placeForm.value.description);
    Object.keys(parentTranslations).forEach((key) => (parentTranslations[key] === '') && delete parentTranslations[key]);
    this.contentServiceInstance.getAvailableLanguages()
      .subscribe((resp) => {
        this.availableLanguages = resp.filter((lng) => lng !== this.placeForm.value.default_lang /*this.defaultLanguage*/).slice();
        Object.assign(this.tabController, parentTranslations);
        this.availableLanguages = this.availableLanguages.filter(lng => !Object.keys(this.tabController).includes(lng));
      });
  }

  getLanguages() {
    return this.objTabs;
  }

  getTranslation(target_lng) {
    const text = this.placeForm.value.description[this.defaultLanguage];
    const translations = Object.assign({}, this.placeForm.value.description);
    this.store.dispatch(new ShowLoader());
    this.contentServiceInstance.getTranslation(this.defaultLanguage, target_lng, text)
      .subscribe((response) => {
        translations[target_lng] = response.translation;
        this.placeForm.controls['description'].setValue(translations);
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

  onDeleteTab(event) {
    if (Object.keys(this.tabController).length <= 1)
      return;

    const dialogConfig = {
      maxHeight: '70%',
      maxWidth: '70%',
      id: 'confirmDialog',
      panelClass: 'eventDialogPanel',
      data: {
        message: `${TRANSLATE('Deseas eliminar?')} ${TRANSLATE(event)}?`
      },
      disableClose: true,
      closeOnNavigation: true,
      hasBackdrop: true
    };
    const confirmationReference = this.matDialog.open(ConfirmationModalComponent, dialogConfig);

    confirmationReference.afterClosed().subscribe(result => {
      if (result) {
        delete this.tabController[event];
        const translations = Object.assign({}, this.placeForm.value.description, {[event]: ''});
        this.placeForm.controls['description'].setValue(translations);
        setTimeout(() => this.selected.setValue(0), 500);
      }
    });
  }

  get tabsLength() {
    return this.objTabs.length <= 1;
  }

  get objTabs() {
    return Object.keys(this.tabController);
  }
}
