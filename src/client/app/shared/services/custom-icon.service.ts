import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init() {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icons/logo.svg')
    );

    this.matIconRegistry.registerFontClassAlias(
      'tg', 'tg-'
    );
  }
}
