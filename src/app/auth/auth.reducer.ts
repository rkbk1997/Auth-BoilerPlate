import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  loggin: boolean;
  error: string;
}

export const initialState: State = {
  loggin: false,
  error: '',
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoadAuths:
      return {
        ...state
      };
      case AuthActionTypes.LoadAuthsSuccess:
        return{
          ...state,
          loggin: action.payload.data,
          error: ''
        };
      case AuthActionTypes.LoadAuthsFailure:
        return{
          ...state,
          loggin: false,
          error: action.payload.error
        };
      // case AuthActionTypes.IncrementCounter:
      //   return{
      //     ...state,
      //     counter: state.counter + 1
      //   };
    default:
      return state;
  }
}
