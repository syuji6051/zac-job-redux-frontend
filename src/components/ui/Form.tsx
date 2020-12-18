/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';

import { FormikContext, FormikContextType } from 'formik';

interface Props {
  className?: string;
  formik: FormikContextType<any>;
  children: ReactNode;
}

const CustomForm: React.FC<Props> = (props: Props) => {
  const { children, formik, className } = props;

  return (
    <FormikContext.Provider value={formik}>
      <form className={className} onSubmit={formik.handleSubmit}>
        {children}
      </form>
    </FormikContext.Provider>
  );
};

export default CustomForm;
