import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatDialogModule } from '@angular/material';
import { GuardModalComponent } from './guard-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],
  exports: [
    GuardModalComponent,
    ConfirmationModalComponent
  ],
  declarations: [
    GuardModalComponent,
    ConfirmationModalComponent
  ],
  providers: [],
  entryComponents: [
    GuardModalComponent,
  ],
})
export class ModalModule {
}
