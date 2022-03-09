import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';
import RegisterWorkCode from '../projects/RegisterWorkCode';
import LinkSlack from '../projects/LinkSlack';
import OtherUserInfo from '../parts/OtherUserInfo';

import classes from '../../styles/components/settings.module.css';
import { getUserInfo } from '../../helper/users';
import { UserInfo } from '../../entities/users';

const settings: React.FC = () => {
  const dispatch = useDispatch();
  const [stateUserInfo, setUserInfo] = React.useState<Partial<UserInfo>>({});
  React.useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <>
      <OtherUserInfo userInfo={stateUserInfo} />
      <div className={classes.registerLoginPassword}>
        <LinkSlack slackUserName={stateUserInfo.slackUserName} />
      </div>
      <div className={classes.registerWorkCode}>
        <RegisterWorkCode />
      </div>
      <Button onClick={() => handleSignOut()}>ログアウト</Button>
    </>
  );
};

export default settings;
