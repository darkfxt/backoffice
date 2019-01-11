import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
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
