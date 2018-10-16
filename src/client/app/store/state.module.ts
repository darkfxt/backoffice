import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AppEffects } from './shared/app.effects';
import { appMetaReducers, appReducer } from './shared/app.reducer';
import { ErrorEffects } from './shared/effects/error.effects';
import { SnackbarEffects } from './shared/effects/snackbar.effects';
import { CustomSerializer } from './shared/utils';
import * as fromSegments from './route/route.reducer';
import * as fromPoints from './place/place.reducer';
import * as fromTripTemplates from './trip-template/trip-template.reducer';
import * as fromAccounts from './account/account.reducer';
import * as fromUsers from './user/user.reducer';
import { SegmentEffects } from './route/route.effects';
import { AccountEffects } from './account/account.effects';
import { PointEffects } from './place/place.effects';
import { TripTemplateEffects } from './trip-template/trip-template.effects';
import { UserEffects } from './user/user.effects';

@NgModule({
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    SharedModule,
    StoreModule.forRoot(appReducer, {
      metaReducers: appMetaReducers
    }),
    StoreModule.forFeature('segments', fromSegments.segmentReducer),
    StoreModule.forFeature('points', fromPoints.pointReducer),
    StoreModule.forFeature('tripTemplates', fromTripTemplates.tripTemplateReducer),
    StoreModule.forFeature('accounts', fromAccounts.accountReducer),
    StoreModule.forFeature('users', fromUsers.userReducer),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([
      AppEffects,
      SegmentEffects,
      AccountEffects,
      PointEffects,
      TripTemplateEffects,
      UserEffects,
      ErrorEffects,
      SnackbarEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: []
})
export class StateModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: StateModule
  ) {
    if (parentModule) {
      throw new Error(
        'StateModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        {
          provide: RouterStateSerializer,
          useClass: CustomSerializer
        }
      ]
    };
  }
}
