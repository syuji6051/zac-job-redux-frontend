/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, createStore as reduxCreateStore, Store } from 'redux';
import { AuthReducer, AuthState } from './modules/Auth';

export type IAppState = {
  authState: AuthState;
};

const rootReducer = () =>
  combineReducers({
    authState: AuthReducer,
  });

const store: Store = reduxCreateStore(rootReducer());
export default store;
