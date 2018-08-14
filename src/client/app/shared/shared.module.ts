import { NgModule } from '@angular/core';
import {DetailHeaderComponent} from './detail-header/detail-header.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    DetailHeaderComponent,
  ],
  declarations: [
    DetailHeaderComponent,
  ],
  entryComponents: [
    DetailHeaderComponent,
  ],
  providers: [ ]
})
export class SharedModule { }
