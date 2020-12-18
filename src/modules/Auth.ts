import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const AuthActions = {
  signedIn: actionCreator<void>('ACTIONS_SIGNED'),
  signOut: actionCreator<void>('ACTIONS_SIGN_OUT'),
  newPasswordChange: actionCreator<void>('ACTIONS_NEW_PASSWORD_CHANGE'),
  notSignIn: actionCreator<void>('ACTIONS_NOT_SIGNED'),
  setUser: actionCreator<AmplifySignInType>('ACTIONS_SET_USER'),
};

export const AUTH_STATUS = {
  SIGN_IN: 'SIGN_IN',
  NEW_PASSWORD_REQUIRED: 'NEW_PASSWORD_REQUIRED',
  NOT_SIGN_IN: 'NOT_SIGN_IN',
  LOADING: 'LOADING',
};

export interface AuthState {
  // ここにstoreが持つstateを書く
  authState: string;
  user: AmplifySignInType;
}

export interface AmplifySignInType {
  challengeName?: string;
  challengeParam?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requiredAttributes: any;
  };
}

export const initialState: AuthState = {
  // ここにstateの初期値を書く
  authState: AUTH_STATUS.LOADING,
  user: {},
};

export const AuthReducer = reducerWithInitialState(initialState)
  .case(AuthActions.signedIn, (state) => ({
    ...state,
    authState: AUTH_STATUS.SIGN_IN,
  }))
  .case(AuthActions.signOut, (state) => ({
    ...state,
    authState: AUTH_STATUS.NOT_SIGN_IN,
  }))
  .case(AuthActions.newPasswordChange, (state) => ({
    ...state,
    authState: AUTH_STATUS.NEW_PASSWORD_REQUIRED,
  }))
  .case(AuthActions.notSignIn, (state) => ({
    ...state,
    authState: AUTH_STATUS.NOT_SIGN_IN,
  }))
  .case(AuthActions.setUser, (state, user) => ({
    ...state,
    user,
  }));
