import React from 'react';
import * as Yup from 'yup';

import RegisterLoginPassword, { Scheme } from '../projects/RegisterLoginPassword';
import { putZacInfo } from '../../helper/users';

import classes from '../../styles/components/settings.module.css';

interface Props {
  initialValues: {
    tenantId: string;
    userId: string;
  };
}

const otherUserInfoZac: React.FC<Props> = (props: Props) => {
  const onSubmitZacLogin = async (scheme: Scheme) => {
    await putZacInfo({
      tenantId: scheme.zacTenantId,
      userId: scheme.zacUserId,
      password: scheme.zacPassword,
    });
  };

  const zacScheme = Yup.object().shape({
    zacTenantId: Yup.string().required('Zac テナントIDを入力してください'),
    zacUserId: Yup.string().required('Zac ログインIDを入力してください'),
    zacPassword: Yup.string().required('Zac パスワードを入力してください'),
  });

  return (
    <div className={classes.registerLoginPassword}>
      <RegisterLoginPassword
        title="Zacログイン情報入力"
        tenant={{
          fieldName: 'zacTenantId',
          placeHolderName: 'Zac テナントID',
          initialValues: props.initialValues.tenantId,
        }}
        login={{
          fieldName: 'zacUserId',
          placeHolderName: 'Zac ログインID',
          initialValues: props.initialValues.userId,
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
  );
};

export default otherUserInfoZac;
