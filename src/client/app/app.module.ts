import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { PlacesModule } from './places/places.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RoutesModule } from './routes/routes.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TripTemplatesModule } from './trip-templates/trip-templates.module';
import { reducers, metaReducers } from './store';
import { SegmentEffects } from './store/route/route.effects';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './shared/tags/tags.component';
import { PointEffects } from './store/place/place.effects';

// Config
import { environment } from '../environments/environment';
import { TripTemplateEffects } from './store/trip-template/trip-template.effects';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const StoreDevTools = !environment.production ? StoreDevtoolsModule.instrument() : [];
// Register new locales
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([PointEffects, SegmentEffects, TripTemplateEffects]),
    StoreDevtoolsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    PlacesModule,
    RoutesModule,
    TripTemplatesModule,
    LoginRoutingModule,
    AppRoutingModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
