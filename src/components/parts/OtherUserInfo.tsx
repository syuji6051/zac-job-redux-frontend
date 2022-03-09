import React from 'react';

import { UserInfo } from '../../entities/users';
import OtherUserInfoZac from './OtherUserInfoZac';
import OtherUserInfoObc from './OtherUserInfoObc';

import classes from '../../styles/components/settings.module.css';

interface Props {
  userInfo: Partial<UserInfo>;
}

const otherUserInfo: React.FC<Props> = ({ userInfo }: Props) => {
  return Object.keys(userInfo).length ? (
    <div>
      <OtherUserInfoZac
        initialValues={{
          tenantId: userInfo.zacTenantId ?? '',
          userId: userInfo.zacUserId ?? '',
        }}
      />
      <OtherUserInfoObc
        initialValues={{
          tenantId: userInfo.obcTenantId ?? '',
          userId: userInfo.obcUserId ?? '',
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
