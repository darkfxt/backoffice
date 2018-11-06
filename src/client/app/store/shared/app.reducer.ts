import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../../environments/environment';
import { AppState } from './app.interfaces';
import * as fromSnackbar from './reducers/snackbar.reducer';
import * as fromLoader from './reducers/loader.reducer';
import { storeLogger } from 'ngrx-store-logger';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  snackbar: fromSnackbar.reducer,
  loader: fromLoader.reducer
};

export function logger(reducer: ActionReducer<AppState>) {
  return storeLogger()(reducer);
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];
