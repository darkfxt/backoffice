/*
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import { pointReducer } from './place/place.reducer';

import { environment } from '../../environments/environment';
import { segmentReducer, SegmentState } from './route/route.reducer';
import { tripTemplateReducer, TripTemplateState } from './trip-template/trip-template.reducer';
import { Event } from '../shared/models/TripTemplate';
import { userReducer, UserState } from './user/user.reducer';
import { accountReducer, AccountState } from './account/account.reducer';

export interface AppState {
  points: PointState;
  segments: SegmentState;
  tripTemplates: TripTemplateState;
  users: UserState;
  accounts: AccountState;
}

export const reducers: ActionReducerMap<AppState> = {
  points: pointReducer,
  segments: segmentReducer,
  tripTemplates: tripTemplateReducer,
  users: userReducer,
  accounts: accountReducer
};

export function logger(reducer: ActionReducer<AppState>) {
  return storeLogger()(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze, logger]
  : [];

const PointStateSelector = createFeatureSelector('points');

export const loadingSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.loading,
);

export const pointSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.points,
);

export const metadataSelector = createSelector(
  PointStateSelector,
  (state: PointState) => state.metadata,
);

const SegmentStateSelector = createFeatureSelector('segments');

export const segmentLoadingSelector = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.loading
);

export const getSegmentsEntityState = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.segments
);

export const segmentMetadataSelector = createSelector(
  SegmentStateSelector,
  (state: SegmentState) => state.metadata
);

const TripTemplateStateSelector = createFeatureSelector('tripTemplates');

export const tripTemplateLoadingSelector = createSelector(
  TripTemplateStateSelector,
  (state: TripTemplateState) => state.loading
);

export const tripTemplateSelector = createSelector(
  TripTemplateStateSelector,
  (state: TripTemplateState) => state.tripTemplates
);

export const eventsFromTemplateSelector = createSelector(
  TripTemplateStateSelector,
  (state: TripTemplateState) => state.selectedTripTemplateEvents
);

export const tripTemplateMetadataSelector = createSelector(
  TripTemplateStateSelector,
  (state: TripTemplateState) => state.metadata
);


/!**
 * User Section
 *!/
const UserStateSelector = createFeatureSelector('users');

export const userLoadingSelector = createSelector(
  UserStateSelector,
  (state: UserState) => state.loading,
);

export const userSelector = createSelector(
  UserStateSelector,
  (state: UserState) => state.users,
);

export const userMetadataSelector = createSelector(
  UserStateSelector,
  (state: UserState) => state.metadata,
);

/!***** Account *****!/
const AccountStateSelector = createFeatureSelector('accounts');

export const accountLoadingSelector = createSelector(
  AccountStateSelector,
  (state: AccountState) => state.loading,
);

export const accountSelector = createSelector(
  AccountStateSelector,
  (state: AccountState) => state.accounts,
);

export const accountMetadataSelector = createSelector(
  AccountStateSelector,
  (state: AccountState) => state.metadata,
);

export { PointsRetrieved } from './place/place.actions';
export { SegmentsRetrieved } from './route/route.actions';
export { TripTemplatesRetrieved } from './trip-template/trip-template.actions';
*/
