import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Button, Label } from 'semantic-ui-react';

import { IAppState } from '../../configureStore';
import { AuthActions, AUTH_STATUS } from '../../modules/Auth';
import errorMessageList from '../../context/errors/login';
import * as helper from '../../helper/Auth';
import { StatusCodeError } from '../../schema/error';
import classes from '../../styles/components/login.module.css';
import Form from '../ui/Form';
import TextField from '../ui/TextField';

interface Schema {
  newPassword: string;
  confirmPassword: string;
}

const validation = Yup.object().shape({
  newPassword: Yup.string()
    .required('新しいパスワードを入力してください')
    .min(6, '6文字以上で入力してください'),
  confirmPassword: Yup.string()
    .required('確認用パスワードを入力してください')
    .min(6, '6文字以上で入力してください'),
});

const passwordChange: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const user = useSelector((state: IAppState) => state.authState.user);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { newPassword: '', confirmPassword: '' },
    onSubmit: (val) => onPressPasswordChange(val),
    validationSchema: validation,
    validateOnMount: true,
  });

  const onPressPasswordChange = async ({ newPassword, confirmPassword }: Schema) => {
    try {
      if (newPassword !== confirmPassword) {
        setErrorMessage('入力したパスワードが一致しません。再度入力してください。');
        return;
      }
      const status = await helper.passwordChange(user, newPassword);
      if (status === AUTH_STATUS.SIGN_IN) {
        dispatch(AuthActions.signedIn());
      }
    } catch (err) {
      if (err) {
        const { code } = err as StatusCodeError;
        const message = errorMessageList[code];
        setErrorMessage(message || 'ログインに失敗しました。管理者にお問い合わせください');
      }
    }
  };

  return (
    <div className={classes.container}>
      <Form formik={formik} className={classes.signInForm}>
        <div className={classes.signLogo}>
          <h3>新しいパスワードの登録が必要です</h3>
        </div>
        <TextField
          name="newPassword"
          size="large"
          className={classes.signInInput}
          placeholder="新しいパスワードを入力"
          type="password"
        />
        <TextField
          name="confirmPassword"
          size="large"
          className={classes.signInInput}
          placeholder="再度パスワードを入力"
          type="password"
        />
        {errorMessage ? (
          <Label basic color="red" pointing="below">
            {errorMessage}
          </Label>
        ) : (
          <div className={classes.signInButtonMargin} />
        )}
        <div>
          <Button size="large" color="orange" type="submit">
            登録
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default passwordChange;
