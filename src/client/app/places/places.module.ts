import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PointComponent}    from './point/point.component';
import {GalleryComponent} from '../shared/gallery/gallery.component';
import {PointMapComponent} from './point/point-map/point-map.component';
import {PointHeadComponent} from './point/point-head/point-head.component';
import {UploaderComponent} from '../shared/uploader/uploader.component';
import {PlacesComponent} from './places.component';

import {PlacesRoutingModule} from './places-routing.module';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlacesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    TranslateModule
  ],
  declarations: [
    PointComponent,
    GalleryComponent,
    PointMapComponent,
    PointHeadComponent,
    UploaderComponent,
    PlacesComponent
  ],
  providers: [ ]
})
export class PlacesModule {}
