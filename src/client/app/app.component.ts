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
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-loading [hidden]="!loading"></app-loading>
  `
})
export class AppComponent implements OnInit {
  title = 'app';
  loading = false;
  loading$: Observable<boolean>;

  constructor(private translate: TranslateService,
              private customIconService: CustomIconService,
              private store: Store<AppState>) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
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
