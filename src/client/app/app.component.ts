import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomIconService } from './shared/services/custom-icon.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService, private customIconService: CustomIconService) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    this.customIconService.init();
  }
}
