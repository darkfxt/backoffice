import { RouterReducerState } from '@ngrx/router-store';
import * as fromSnackbar from './reducers/snackbar.reducer';
import * as fromLoader from './reducers/loader.reducer';
import { RouterStateUrl } from './utils';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  snackbar: fromSnackbar.State;
  loader: fromLoader.State;
}
