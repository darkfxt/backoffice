import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceSummarizedCardComponent } from './devices-list/device-summarized-card/device-summarized-card.component';
import { CommonListModule } from '../shared/common-list/common-list.module';
import { SharedModule } from '../shared/shared.module';
import {
  MatButtonModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule, MatOptionModule,
  MatSlideToggleModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CommonListModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatMenuModule,
    DevicesRoutingModule,
    TranslateModule
  ],
  declarations: [DeviceDetailComponent, DevicesListComponent, DeviceSummarizedCardComponent],
  exports: [DeviceSummarizedCardComponent]
})
export class DevicesModule { }
