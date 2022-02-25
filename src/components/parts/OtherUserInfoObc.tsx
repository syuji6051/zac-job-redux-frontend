import React from 'react';
import * as Yup from 'yup';

import RegisterLoginPassword, { Scheme } from '../projects/RegisterLoginPassword';
import { putObcInfo } from '../../helper/users';

import classes from '../../styles/components/settings.module.css';

interface Props {
  initialValues: {
    tenantId: string;
    userId: string;
  };
}

const otherUserInfoZac: React.FC<Props> = (props: Props) => {
  const onSubmitObcLogin = async (scheme: Scheme) => {
    await putObcInfo({
      tenantId: scheme.obcTenantId,
      userId: scheme.obcUserId,
      password: scheme.obcPassword,
    });
  };

  const obcScheme = Yup.object().shape({
    obcTenantId: Yup.string().required('OBC テナントIDを入力してください'),
    obcUserId: Yup.string().required('OBC ログインIDを入力してください'),
    obcPassword: Yup.string().required('OBC パスワードを入力してください'),
  });

  return (
    <div className={classes.registerLoginPassword}>
      <RegisterLoginPassword
        id="obcLoginPassword"
        title="Obcログイン情報入力"
        tenant={{
          fieldName: 'obcTenantId',
          placeHolderName: 'Obc テナントID',
          initialValues: props.initialValues.tenantId,
        }}
        login={{
          fieldName: 'obcUserId',
          placeHolderName: 'Obc ログインID',
          initialValues: props.initialValues.userId,
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
  );
};

export default otherUserInfoZac;
