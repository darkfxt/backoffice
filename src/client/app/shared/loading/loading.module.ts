import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingComponent
  ],
  declarations: [
    LoadingComponent,
  ],
  providers: [ ]
})
export class LoadingModule {}
