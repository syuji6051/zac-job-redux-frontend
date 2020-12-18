import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { IAppState } from '../../configureStore';
import { AuthActions, AUTH_STATUS } from '../../modules/Auth';
import Home from '../pages/Home';
import PasswordChange from '../pages/LoginPasswordChange';
import SignIn from '../pages/LoginSignIn';

const Routers: React.FC = () => {
  const { authState } = useSelector((state: IAppState) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    (() => {
      const status = localStorage.getItem('AuthState');
      if (status === AUTH_STATUS.SIGN_IN) {
        dispatch(AuthActions.signedIn());
      } else {
        dispatch(AuthActions.notSignIn());
      }
    })();
  }, []);

  return (
    <>
      {authState === AUTH_STATUS.SIGN_IN ? (
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      ) : (
        authState !== AUTH_STATUS.LOADING && (
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/login" component={SignIn} />
            <Route path="/password/change" component={PasswordChange} />
          </Switch>
        )
      )}
    </>
  );
};

export default Routers;
