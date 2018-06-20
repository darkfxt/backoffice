import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoutesRoutingModule} from './routes-routing.module';
import {RoutesComponent} from './routes.component';
import {RouteComponent} from './route/route.component';
import {MatAutocompleteModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouteMapComponent} from './route/route-map/route-map.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesRoutingModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    TranslateModule
  ],
  declarations: [
    RoutesComponent,
    RouteComponent,
    RouteMapComponent
  ]
})
export class RoutesModule { }
