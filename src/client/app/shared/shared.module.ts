import { NgModule } from '@angular/core';
import { DetailHeaderComponent } from './detail-header/detail-header.component';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    TranslateModule,
    PipesModule
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
