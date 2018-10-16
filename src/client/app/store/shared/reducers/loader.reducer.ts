import { LOADER_HIDE, LOADER_SHOW, LoaderAction } from '../actions/loader.actions';

export interface State {
  show: boolean;
}

const initialState: State = {
  show: false
};

export function reducer(state: State = initialState, action: LoaderAction) {
  switch (action.type) {
    case LOADER_HIDE:
      return { ...state, show: false };
    case LOADER_SHOW:
      return { ...state, show: true };
    default:
      return state;
  }
}

export const isShowing = (state: State) => state.show;
