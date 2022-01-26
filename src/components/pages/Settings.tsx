import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { API } from 'aws-amplify';

import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';
import RegisterLoginPassword, { Scheme } from '../projects/RegisterLoginPassword';
import classes from '../../styles/components/settings.module.css';
import RegisterWorkCode from '../projects/RegisterWorkCode';
import LinkSlack from '../projects/LinkSlack';

const zacScheme = Yup.object().shape({
  zacTenantId: Yup.string().required('Zac テナントIDを入力してください'),
  zacUserId: Yup.string().required('Zac ログインIDを入力してください'),
  zacPassword: Yup.string().required('Zac パスワードを入力してください'),
});

const obcScheme = Yup.object().shape({
  obcTenantId: Yup.string().required('OBC テナントIDを入力してください'),
  obcUserId: Yup.string().required('OBC ログインIDを入力してください'),
  obcPassword: Yup.string().required('OBC パスワードを入力してください'),
});

const home: React.FC = () => {
  const dispatch = useDispatch();

  const onSubmitZacLogin = async ({ tenantId, userId, password }: Scheme) => {
    await API.put('cognito-user', '/users/zac/login', {
      body: {
        tenantId,
        userId,
        password,
      },
    });
  };

  const onSubmitObcLogin = async ({ tenantId, userId, password }: Scheme) => {
    await API.put('cognito-user', '/users/obc/login', {
      body: {
        tenantId,
        userId,
        password,
      },
    });
  };

  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <>
      <div className={classes.registerLoginPassword}>
        <RegisterLoginPassword
          title="Zacログイン情報入力"
          tenant={{
            fieldName: 'zacTenantId',
            placeHolderName: 'Zac テナントID',
          }}
          login={{
            fieldName: 'zacUserId',
            placeHolderName: 'Zac ログインID',
          }}
          password={{
            fieldName: 'zacPassword',
            placeHolderName: 'Zac ログイン パスワード',
          }}
          registerButton={{
            name: '登録',
          }}
          validationSchema={zacScheme}
          onSubmit={(val) => onSubmitZacLogin(val)}
        />
      </div>
      <div className={classes.registerLoginPassword}>
        <RegisterLoginPassword
          title="Obcログイン情報入力"
          tenant={{
            fieldName: 'obcTenantId',
            placeHolderName: 'Obc テナントID',
          }}
          login={{
            fieldName: 'obcUserId',
            placeHolderName: 'Obc ログインID',
          }}
          password={{
            fieldName: 'obcPassword',
            placeHolderName: 'Obc ログイン パスワード',
          }}
          registerButton={{
            name: '登録',
          }}
          validationSchema={obcScheme}
          onSubmit={(val) => onSubmitObcLogin(val)}
        />
      </div>
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
