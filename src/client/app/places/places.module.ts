import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { PointComponent}    from './point/point.component';
import {GalleryComponent} from './point/gallery/gallery.component';
import {PointMapComponent} from './point/point-map/point-map.component';
import {PointHeadComponent} from './point/point-head/point-head.component';
import {UploaderComponent} from '../shared/uploader/uploader.component';
import {PlacesComponent} from './places.component';
import { CommonListModule } from '../shared/common-list/common-list.module';

import {PlacesRoutingModule} from './places-routing.module';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {LoadingModule} from '../shared/loading/loading.module';
import {UploaderModule} from '../shared/uploader/uploader.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store';
import { PointSummarizedCardComponent } from './point-summarized-card/point-summarized-card.component';
import { PointFiltersComponent } from './point-filters/point-filters.component';

@NgModule({
  imports: [
    StoreModule.forFeature('points', reducers),
    CommonModule,
    CommonListModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderModule,
    PlacesRoutingModule,
    LoadingModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    TranslateModule,
    MatIconModule
  ],
  declarations: [
    PointComponent,
    GalleryComponent,
    PointMapComponent,
    PointHeadComponent,
    PlacesComponent,
    PointSummarizedCardComponent,
    PointFiltersComponent
  ],
  providers: [ ]
})
export class PlacesModule {}
