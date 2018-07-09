import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {UploaderComponent} from './uploader.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    UploaderComponent
  ],
  declarations: [
    UploaderComponent
  ],
  providers: [ ]
})
export class UploaderModule {}
