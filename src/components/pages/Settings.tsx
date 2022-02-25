import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';
import RegisterWorkCode from '../projects/RegisterWorkCode';
import LinkSlack from '../projects/LinkSlack';
import OtherUserInfo from '../parts/OtherUserInfo';

import classes from '../../styles/components/settings.module.css';

const home: React.FC = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <>
      <OtherUserInfo />
      <div className={classes.registerLoginPassword}>
        <LinkSlack />
      </div>
      <div className={classes.registerWorkCode}>
        <RegisterWorkCode />
      </div>
      <Button onClick={() => handleSignOut()}>ログアウト</Button>
    </>
  );
};

export default home;
