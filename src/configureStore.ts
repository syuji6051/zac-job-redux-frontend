/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, Store } from 'redux';
import { routerMiddleware, connectRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';

import { AuthReducer, AuthState } from './modules/Auth';

export type IAppState = {
  authState: AuthState;
  router: RouterState;
};

const rootReducer = (history: History) =>
  combineReducers({
    authState: AuthReducer,
    router: connectRouter(history),
  });

export const history = createBrowserHistory();

export default function configureStore(): Store {
  const store = reduxCreateStore(rootReducer(history), applyMiddleware(routerMiddleware(history)));
  return store;
}
// const routReducer = (history: History<any>) =>
//   combineReducers<IAppState>({
//     authState: AuthReducer,
//     router: connectRouter(history),
//   });
// const history = createBrowserHistory();

// const store = reduxCreateStore(
//   connectRouter(history)(AuthReducer),
//   applyMiddleware(routerMiddleware(history))
// );

// export default store;

// createStore(
//   combineReducers<IAppState>({
//     authState: AuthReducer,
//     router: connectRouter(history),
//   }),
//   applyMiddleware(routerMiddleware(history))
// );

// export default store;
