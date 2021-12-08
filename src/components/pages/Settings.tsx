import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { API } from 'aws-amplify';

import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';
import RegisterLoginPassword from '../projects/RegisterLoginPassword';
import classes from '../../styles/components/settings.module.css';
import RegisterWorkCode from '../projects/RegisterWorkCode';
import LinkSlack from '../projects/LinkSlack';

interface ZacScheme {
  zacTenantId: string;
  zacUserId: string;
  zacPassword: string;
}

interface ObcScheme {
  obcTenantId: string;
  obcUserId: string;
  obcPassword: string;
}

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

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const zacFormik = useFormik({
    initialValues: { zacTenantId: '', zacUserId: '', zacPassword: '' },
    onSubmit: (val) => onSubmitZacLogin(val),
    validationSchema: zacScheme,
    validateOnMount: true,
  });

  const obcFormik = useFormik({
    initialValues: { obcTenantId: '', obcUserId: '', obcPassword: '' },
    onSubmit: (val) => onSubmitObcLogin(val),
    validationSchema: obcScheme,
    validateOnMount: true,
  });

  const onSubmitZacLogin = async ({ zacTenantId, zacUserId, zacPassword }: ZacScheme) => {
    await API.put('cognito-user', '/users/zac/login', {
      body: {
        zacTenantId,
        zacUserId,
        zacPassword,
      },
    });
  };

  const onSubmitObcLogin = async ({ obcTenantId, obcUserId, obcPassword }: ObcScheme) => {
    console.log(obcScheme);
    await API.put('cognito-user', '/users/obc/login', {
      body: {
        obcTenantId,
        obcUserId,
        obcPassword,
      },
    });
  };

  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <div className={classes.container}>
      <div className={classes.registerLoginPassword}>
        <RegisterLoginPassword
          formik={zacFormik}
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
        />
      </div>
      <div className={classes.registerLoginPassword}>
        <RegisterLoginPassword
          formik={obcFormik}
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
        />
      </div>
      <div className={classes.registerLoginPassword}>
        <LinkSlack />
      </div>
      <div className={classes.registerWorkCode}>
        <RegisterWorkCode />
      </div>
      <Button onClick={() => handleSignOut()}>ログアウト</Button>
    </div>
  );
};

export default Home;
