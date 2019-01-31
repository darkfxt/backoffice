import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { PlacesModule } from './places/places.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { RoutesModule } from './routes/routes.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TripTemplatesModule } from './trip-templates/trip-templates.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './login/login.component';
import { TagsComponent } from './shared/tags/tags.component';

// Config
import { environment } from '../environments/environment';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { LoadingModule } from './shared/loading/loading.module';
import { StateModule } from './store/state.module';
import { ErrorComponent } from './error/error.component';
import { BookingModule } from './booking/booking.module';
import { DevicesModule } from './devices/devices.module';
import { FooterComponent } from './shared/footer/footer.component';



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
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    TagsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StateModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: false}),
    BrowserAnimationsModule,
    LoadingModule,
    PlacesModule,
    RoutesModule,
    TripTemplatesModule,
    BookingModule,
    UsersModule,
    AccountsModule,
    DevicesModule,
    LoginRoutingModule,
    AppRoutingModule,
    MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
