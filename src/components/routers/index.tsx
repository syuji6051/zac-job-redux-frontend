import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Hub } from 'aws-amplify';

import { IAppState } from '../../configureStore';
import { AuthActions, AUTH_STATUS } from '../../modules/Auth';
import Drawer from '../common/Drawer';
import Settings from '../pages/Settings';
import PasswordChange from '../pages/LoginPasswordChange';
import SignIn from '../pages/LoginSignIn';
import ZacWork from '../pages/ZacWork';

import classes from '../../styles/components/router.module.css';
import SlackAuthCallback from '../pages/SlackAuthCallback';

const routers: React.FC = () => {
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
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'tokenRefresh_failure': {
          dispatch(AuthActions.signOut());
          break;
        }
        default:
      }
    });
  }, []);

  return (
    <div>
      {authState === AUTH_STATUS.SIGN_IN ? (
        <div className={classes.container}>
          {/* <Header /> */}
          <Drawer />
          <div className={classes.mainContent}>
            <div className={classes.mainChildContent}>
              <Switch>
                <Route exact path="/" component={Settings} />
                <Route path="/zac" component={ZacWork} />
                <Route path="/auth/slack" component={SlackAuthCallback} />
              </Switch>
            </div>
          </div>
        </div>
      ) : (
        authState !== AUTH_STATUS.LOADING && (
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/login" component={SignIn} />
            <Route path="/password/change" component={PasswordChange} />
          </Switch>
        )
      )}
    </div>
  );
};

export default routers;
