import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app';

  constructor(private translate: TranslateService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    iconRegistry.addSvgIcon(
      'driving',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/driving.svg'));
  }
}
