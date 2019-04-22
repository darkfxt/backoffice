import { NgModule } from '@angular/core';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './pipes/pipes.module';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    PipesModule,
    MatDialogModule
  ],
  exports: [
    DetailHeaderComponent,
    ShareModalComponent,
    ContactFormComponent
  ],
  declarations: [
    DetailHeaderComponent,
    ShareModalComponent,
    ContactFormComponent
  ],
  entryComponents: [
    DetailHeaderComponent,
    ShareModalComponent,
    ContactFormComponent
  ],
  providers: [ ]
})
export class SharedModule { }
