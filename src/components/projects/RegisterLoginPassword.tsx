import React from 'react';
import { useFormik } from 'formik';
import { Button, FormInputProps } from 'semantic-ui-react';
import { ObjectSchema } from 'yup';
import Form from '../ui/Form';

import classes from '../../styles/components/extends-login.module.css';
import TextField from '../ui/TextField';

export interface Scheme {
  [fieldName: string]: string;
}

interface Props extends FormInputProps {
  title: string;
  tenant: {
    fieldName: string;
    placeHolderName: string;
    initialValues: string;
  };
  login: {
    fieldName: string;
    placeHolderName: string;
    initialValues: string;
  };
  password: {
    fieldName: string;
    placeHolderName: string;
  };
  registerButton: {
    name: string;
  };
  validationSchema: ObjectSchema<any>;
  onSubmit: (val: Scheme) => Promise<void>;
}

const registerLoginPassword: React.FC<Props> = (props: Props) => {
  const { title, tenant, login, password, registerButton, validationSchema, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      [login.fieldName]: login.initialValues,
      [password.fieldName]: '',
      [tenant.fieldName]: tenant.initialValues,
    },
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

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

export default registerLoginPassword;
