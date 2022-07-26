import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PointComponent }    from './point/point.component';
import { GalleryComponent } from './point/gallery/gallery.component';
import { PointMapComponent } from './point/point-map/point-map.component';
import { PointHeadComponent } from './point/point-head/point-head.component';
import { UploaderComponent } from '../shared/uploader/uploader.component';
import { PlacesComponent } from './places.component';
import { CommonListModule } from '../shared/common-list/common-list.module';

import { PlacesRoutingModule } from './places-routing.module';
import {
  MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatMenuModule, MatOptionModule, MatProgressSpinnerModule, MatSelectModule, MatSliderModule, MatSnackBarModule
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingModule } from '../shared/loading/loading.module';
import { UploaderModule } from '../shared/uploader/uploader.module';
import { PointSummarizedCardComponent } from './point-summarized-card/point-summarized-card.component';
import { PointFiltersComponent } from './point-filters/point-filters.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceDetailComponent } from './place-detail/place-detail.component';

@NgModule({
  imports: [
    // StoreModule.forFeature('points', reducers),
    CommonModule,
    CommonListModule,
    FormsModule,
    ReactiveFormsModule,
    UploaderModule,
    PlacesRoutingModule,
    LoadingModule,
    MatIconModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    TranslateModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule
  ],
  declarations: [
    PointComponent,
    PlaceDetailComponent,
    GalleryComponent,
    PointMapComponent,
    PointHeadComponent,
    PlacesComponent,
    PointSummarizedCardComponent,
    PointFiltersComponent
  ],
  providers: [ ],
  exports: [PlacesComponent]
})
export class PlacesModule {}
