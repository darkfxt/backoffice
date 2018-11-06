import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromLoader from './loader.reducer';

export const selectLoaderEntity = createFeatureSelector<fromLoader.State>(
  'loader'
);
export const isLoaderShowing = createSelector(
  selectLoaderEntity,
  fromLoader.isShowing
);
