import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Hub } from 'aws-amplify';

import { IAppState } from '../../store';
import { AuthActions, AUTH_STATUS } from '../../modules/Auth';
import Drawer from '../common/Drawer';
import Settings from '../pages/Settings';
import PasswordChange from '../parts/LoginPasswordChange';
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
    <div className={classes.container}>
      {authState === AUTH_STATUS.SIGN_IN ? (
        <>
          {/* <Header /> */}
          <Drawer />
          <div className={classes.mainContent}>
            <div className={classes.mainChildContent}>
              <Routes>
                <Route path="/" element={<Settings />} />
                <Route path="/zac" element={<ZacWork />} />
                <Route path="/auth/slack" element={<SlackAuthCallback />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        authState !== AUTH_STATUS.LOADING && (
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/password/change" element={<PasswordChange />} />
          </Routes>
        )
      )}
    </div>
  );
};

export default routers;
