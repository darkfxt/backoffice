import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {UploaderModule} from '../shared/uploader/uploader.module';
import {ModalModule} from '../shared/modal/modal.module';
import {ProgramsRoutingModule} from './programs-routing.module';
import {ProgramsComponent} from './programs.component';
import {ProgramComponent} from './program/program.component';

@NgModule({
  imports: [
    CommonModule,
    UploaderModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramsRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatMenuModule,
    TranslateModule,
    ModalModule
  ],
  declarations: [
    ProgramsComponent,
    ProgramComponent,
  ]
})
export class ProgramsModule { }
