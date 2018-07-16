import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import {MatButtonModule, MatDialogModule} from '@angular/material';
import {GuardModalComponent} from './guard-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    GuardModalComponent
  ],
  declarations: [
    GuardModalComponent
  ],
  providers: [
  ],
  entryComponents: [
    GuardModalComponent,
  ],
})
export class ModalModule {}
