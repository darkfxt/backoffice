import { NgModule } from '@angular/core';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlaceTypeSelectorComponent } from './place-type-selector/place-type-selector.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ],
  exports: [
    DetailHeaderComponent,
    PlaceTypeSelectorComponent,
  ],
  declarations: [
    DetailHeaderComponent,
    PlaceTypeSelectorComponent,
  ],
  entryComponents: [
    DetailHeaderComponent,
  ],
  providers: [ ]
})
export class SharedModule { }
