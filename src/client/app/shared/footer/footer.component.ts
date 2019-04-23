import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {TRANSLATE} from '../../translate-marker';
import {SnackbarOpen} from '../../store/shared/actions/snackbar.actions';
import {ConfirmationModalComponent} from '../modal/confirmation-modal/confirmation-modal.component';
import {ModalService} from '../modal/modal.service';
import {MatDialog} from '@angular/material';
import {ContactFormComponent} from '../contact-form/contact-form.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  options = [
    'es',
    'en'
    ];

  userLanguage = navigator.language;
  languageSelected: {};

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    let navLanguage: string, navLocalization: string;
    if (!localStorage.getItem('uiLanguage')) {
      [navLanguage, navLocalization] = this.userLanguage.split('-');
      localStorage.setItem('uiLanguage', navLanguage);
      localStorage.setItem('uiL10n', navLocalization);
    } else {
      navLanguage = localStorage.getItem('uiLanguage');
      navLocalization = localStorage.getItem('uiL10n');
    }
    this.languageSelected = navLanguage;
  }

  changeLanguage(event) {
    localStorage.removeItem('uiLanguage');
    const [languageToUpdate, l10nToUpdate] = event.split('-');
    localStorage.setItem('uiLanguage', languageToUpdate);
    localStorage.setItem('uiL10n', l10nToUpdate);
    this.translate.use(languageToUpdate);
  }



}
