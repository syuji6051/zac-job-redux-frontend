import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';

import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';
import Form from '../ui/Form';
import TextField from '../ui/TextField';
import classes from '../../styles/components/home.module.css';

interface Scheme {
  zacLoginId: string;
  zacLoginPassword: string;
}

const scheme = Yup.object().shape({
  zacLoginId: Yup.string().required('Zac ログインIDを入力してください'),
  zacLoginPassword: Yup.string().required('Zac パスワードを入力してください'),
});

const Home: React.FC = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: IAppState) => state.authState.user);

  const formik = useFormik({
    initialValues: { zacLoginId: '', zacLoginPassword: '' },
    onSubmit: (val) => onSubmitZacLogin(val),
    validationSchema: scheme,
    validateOnMount: true,
  });

  const onSubmitZacLogin = async ({ zacLoginId, zacLoginPassword }: Scheme) => {
    const user = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(user, {
      'custom:zacLoginId': zacLoginId,
      'custom:zacPassword': zacLoginPassword,
    });
  };

  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <div>
      <Form formik={formik} className={classes.form}>
        <h3>Zacログイン情報入力</h3>
        <div className={classes.inputForm}>
          <div className={classes.textField}>
            <TextField
              name="zacLoginId"
              placeholder="Zac ログインID"
              size="large"
              type="text"
              pointing="above"
            />
          </div>
          <div className={classes.textField}>
            <TextField
              name="zacLoginPassword"
              placeholder="Zac ログイン パスワード"
              size="large"
              type="password"
              pointing="above"
            />
          </div>
          <Button size="large" color="orange" className={classes.registerButton}>
            登録
          </Button>
        </div>
      </Form>
      <Button onClick={() => handleSignOut()}>ログアウト</Button>
    </div>
  );
};

export default Home;
