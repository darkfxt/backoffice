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
import {UploaderComponent} from '../shared/uploader/uploader.component';
import {UploaderModule} from '../shared/uploader/uploader.module';

@NgModule({
  imports: [
    CommonModule,
    UploaderModule,
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
    TranslateModule
  ],
  declarations: [
    RoutesComponent,
    RouteComponent,
    RouteMapComponent,
    RoutePointsComponent,
    RouteHeadComponent,
    RouteCoverComponent,
    RouteInfoComponent
  ]
})
export class RoutesModule { }
