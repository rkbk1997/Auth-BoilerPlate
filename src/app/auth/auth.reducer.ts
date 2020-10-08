import { AuthActions, AuthActionTypes } from './auth.actions';
import { User } from '../models/user';

export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  error: object;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
        },
        error: null,
      };
    }
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
