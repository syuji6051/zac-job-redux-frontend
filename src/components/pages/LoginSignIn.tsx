import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Label } from 'semantic-ui-react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Form from '../ui/Form';
import TextField from '../ui/TextField';
import { signIn } from '../../helper/Auth';
import { AuthActions, AUTH_STATUS } from '../../modules/Auth';
import errorMessageList from '../../context/errors/login';
import classes from '../../styles/components/login.module.css';

interface Scheme {
  mailAddress: string;
  password: string;
}

interface SignError extends Error {
  code: string;
}

const scheme = Yup.object().shape({
  mailAddress: Yup.string()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式が正しくありません'),
  password: Yup.string().required('パスワードを入力してください'),
});

const SignIn: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: { mailAddress: '', password: '' },
    onSubmit: (val) => onPressSignIn(val),
    validationSchema: scheme,
    validateOnMount: true,
  });

  const onPressSignIn = async ({ mailAddress, password }: Scheme) => {
    try {
      const { user, status } = await signIn(mailAddress, password);
      switch (status) {
        case AUTH_STATUS.SIGN_IN:
          dispatch(AuthActions.signedIn());
          break;
        case AUTH_STATUS.NEW_PASSWORD_REQUIRED:
          dispatch(AuthActions.setUser(user));
          dispatch(AuthActions.newPasswordChange());
          history.push('password/change');
          break;
        default:
          throw new Error('Not change auth status');
      }
    } catch (err) {
      if (err instanceof Error) {
        const error = err as SignError;
        const message = errorMessageList[error.code];
        setErrorMessage(message || 'ログインに失敗しました。管理者にお問い合わせください');
      }
    }
  };

  return (
    <div className={classes.container}>
      <Form formik={formik} className={classes.signInForm}>
        <div className={classes.signLogo}>
          <h1>Welcome</h1>
        </div>
        <TextField
          name="mailAddress"
          size="large"
          className={classes.signInInput}
          placeholder="メールアドレス"
          type="email"
        />
        <TextField
          name="password"
          size="large"
          className={classes.signInInput}
          placeholder="パスワード"
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
            ログイン
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
