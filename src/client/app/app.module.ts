import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {PlacesModule} from './places/places.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {LoginRoutingModule} from './login/login-routing.module';
import {RoutesModule} from './routes/routes.module';

// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {PageNotFoundComponent} from './not-found.component';
import {LoginComponent} from './login/login.component';

// Config
import {environment} from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    PlacesModule,
    RoutesModule,
    LoginRoutingModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
