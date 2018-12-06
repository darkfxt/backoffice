import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ErrorComponent } from './error/error.component';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesModule',
    canActivateChild: [AuthGuard],
  },
  {
    path: 'routes',
    loadChildren: './routes/routes.module#RoutesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'trip-templates',
    loadChildren: './trip-templates/trip-templates.module#TripTemplatesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: 'accounts',
    loadChildren: './accounts/accounts.module#AccountsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'booking',
    loadChildren: './booking/booking.module#BookingModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'devices',
    loadChildren: './devices/devices.module#DevicesModule',
    canActivate: [AuthGuard]
  },
  { path: 'error', component: ErrorComponent},
  { path: '',   redirectTo: '/booking', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: !environment.production, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
