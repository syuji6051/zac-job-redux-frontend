import React from 'react';
import { FormikContextType } from 'formik';
import { Button } from 'semantic-ui-react';
import Form from '../ui/Form';

import classes from '../../styles/components/extends-login.module.css';
import TextField from '../ui/TextField';

interface Props {
  formik: FormikContextType<any>;
  title: string;
  tenant: {
    fieldName: string;
    placeHolderName: string;
  };
  login: {
    fieldName: string;
    placeHolderName: string;
  };
  password: {
    fieldName: string;
    placeHolderName: string;
  };
  registerButton: {
    name: string;
  };
}

const RegisterLoginPassword: React.FC<Props> = (props: Props) => {
  const { formik, title, tenant, login, password, registerButton } = props;
  return (
    <Form formik={formik} className={classes.form}>
      <h3>{title}</h3>
      <div className={classes.inputForm}>
        <div className={classes.textField}>
          <TextField
            name={tenant.fieldName}
            placeholder={tenant.placeHolderName}
            size="large"
            type="text"
            pointing="above"
          />
        </div>
        <div className={classes.textField}>
          <TextField
            name={login.fieldName}
            placeholder={login.placeHolderName}
            size="large"
            type="text"
            pointing="above"
          />
        </div>
        <div className={classes.textField}>
          <TextField
            name={password.fieldName}
            placeholder={password.placeHolderName}
            size="large"
            type="password"
            pointing="above"
          />
        </div>
        <Button type="submit" size="large" color="orange" className={classes.registerButton}>
          {registerButton.name}
        </Button>
      </div>
    </Form>
  );
};

export default RegisterLoginPassword;
