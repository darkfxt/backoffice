import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule,
  MatOptionModule, MatSelectModule, MatMenuModule
} from '@angular/material';

// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {PointComponent} from './point/point.component';

import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UploaderComponent} from './uploader/uploader.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TagsComponent} from './tags/tags.component';
import {GalleryComponent} from './gallery/gallery.component';
import {PointMapComponent} from './point/point-map/point-map.component';
import {PointHeadComponent} from './point/point-head/point-head.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PointComponent,
    UploaderComponent,
    TagsComponent,
    GalleryComponent,
    PointMapComponent,
    PointHeadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
