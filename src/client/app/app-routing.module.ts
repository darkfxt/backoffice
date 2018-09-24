import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
  {
    path: 'places',
    loadChildren: './places/places.module#PlacesModule',
  },
  {
    path: 'routes',
    loadChildren: './routes/routes.module#RoutesModule',
  },
  {
    path: 'trip-templates',
    loadChildren: './trip-templates/trip-templates.module#TripTemplatesModule',
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  { path: '',   redirectTo: '/routes', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
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
