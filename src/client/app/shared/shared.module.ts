import { NgModule } from '@angular/core';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './pipes/pipes.module';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { ModalModule } from './modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    TranslateModule,
    PipesModule,
    MatDialogModule,
    ModalModule
  ],
  exports: [
    DetailHeaderComponent,
    ShareModalComponent
  ],
  declarations: [
    DetailHeaderComponent,
    ShareModalComponent
  ],
  entryComponents: [
    DetailHeaderComponent,
    ShareModalComponent
  ],
  providers: [ ]
})
export class SharedModule { }
