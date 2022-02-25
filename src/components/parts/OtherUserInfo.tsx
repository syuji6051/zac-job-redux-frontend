import React from 'react';

import { UserInfo } from '../../entities/users';
import { getUserInfo } from '../../helper/users';
import OtherUserInfoZac from './OtherUserInfoZac';
import OtherUserInfoObc from './OtherUserInfoObc';

import classes from '../../styles/components/settings.module.css';

const otherUserInfo: React.FC = () => {
  const [stateUserInfo, setUserInfo] = React.useState<Partial<UserInfo>>({});
  React.useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  return Object.keys(stateUserInfo).length ? (
    <div>
      <OtherUserInfoZac
        initialValues={{
          tenantId: stateUserInfo.zacTenantId ?? '',
          userId: stateUserInfo.zacUserId ?? '',
        }}
      />
      <OtherUserInfoObc
        initialValues={{
          tenantId: stateUserInfo.obcTenantId ?? '',
          userId: stateUserInfo.obcUserId ?? '',
        }}
      />
    </div>
  ) : (
    <div className={classes.loadingLoginPassword}>
      <img className={classes.logo} src={`${process.env.PUBLIC_URL}/loading.svg`} alt="error" />
    </div>
  );
};

export default otherUserInfo;
