import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoutesRoutingModule} from './routes-routing.module';
import {RoutesComponent} from './routes.component';
import {RouteComponent} from './route/route.component';
import {
  MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteMapComponent} from './route/route-map/route-map.component';
import {TranslateModule} from '@ngx-translate/core';
import {RoutePointsComponent} from './route/route-points/route-points.component';
import {RouteHeadComponent} from './route/route-head/route-head.component';
import {RouteCoverComponent} from './route/route-cover/route-cover.component';
import {RouteInfoComponent} from './route/route-info/route-info.component';
import {UploaderModule} from '../shared/uploader/uploader.module';
import {ModalModule} from '../shared/modal/modal.module';
import { RouteSummarizedCardComponent } from './route-summarized-card/route-summarized-card.component';
import { RouteFiltersComponent } from './route-filters/route-filters.component';
import {CommonListModule} from '../shared/common-list/common-list.module';
import {StoreModule} from '@ngrx/store';
import {reducers} from '../store';

@NgModule({
  imports: [
    StoreModule.forFeature('segments', reducers),
    CommonModule,
    CommonListModule,
    UploaderModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
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
    RoutesComponent,
    RouteComponent,
    RouteMapComponent,
    RoutePointsComponent,
    RouteHeadComponent,
    RouteCoverComponent,
    RouteInfoComponent,
    RouteSummarizedCardComponent,
    RouteFiltersComponent
  ],
  providers: [ ]
})
export class RoutesModule { }
