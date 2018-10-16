import { Action } from '@ngrx/store';
import { createActionType } from '../utils';

export const LOADER_SHOW = createActionType('LOADER_SHOW');
export const LOADER_HIDE = createActionType('LOADER_HIDE');

export class HideLoader implements Action {
  readonly type = LOADER_HIDE;
}

export class ShowLoader implements Action {
  readonly type = LOADER_SHOW;
}

export type LoaderAction = ShowLoader | HideLoader;
