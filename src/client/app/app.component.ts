import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomIconService } from './shared/services/custom-icon.service';
import { select, Store } from '@ngrx/store';
import { AppState } from './store/shared/app.interfaces';
import { isLoaderShowing, selectLoaderEntity } from './store/shared/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div id="main">
      <router-outlet></router-outlet>
    </div>
    <app-loading [hidden]="!loading"></app-loading>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  availableLanguage = [
    'en',
    'es'
  ];
  title = 'app';
  loading = false;
  loading$: Observable<boolean>;

  userLanguage = navigator.language;

  constructor(private translate: TranslateService,
              private customIconService: CustomIconService,
              private store: Store<AppState>) {
    let navLanguage: string, navLocalization: string;

    if (localStorage.getItem('uiLanguage') && this.availableLanguage.indexOf(localStorage.getItem('uiLanguage')) === -1)
      localStorage.setItem('uiLanguage', 'en');

    if (!localStorage.getItem('uiLanguage')) {
      [navLanguage, navLocalization] = this.userLanguage.split('-');
      navLanguage = this.availableLanguage.indexOf(navLanguage) > -1 ? navLanguage : 'en';
      localStorage.setItem('uiLanguage', navLanguage);
      localStorage.setItem('uiL10n', navLocalization);
    } else {
      navLanguage = localStorage.getItem('uiLanguage');
      navLocalization = localStorage.getItem('uiL10n');
    }
    navLanguage = this.availableLanguage.indexOf(navLanguage) > -1 ? navLanguage : 'en';
    this.translate.setDefaultLang(navLanguage);
    this.translate.use(navLanguage);
    this.store.select(selectLoaderEntity).subscribe(loader => setTimeout(() => this.loading = loader.show) );
    this.customIconService.init();
    //
  }

  ngOnInit() {
    // this.store.select(loadingSelector).subscribe( loading => {
    //     console.log('LOADING', loading);
    //   }
    // );
    // this.loading$ = this.store.pipe(select(isLoaderShowing));
  }
}
