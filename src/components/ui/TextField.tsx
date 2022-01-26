/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { Input, InputOnChangeData, InputProps, Label } from 'semantic-ui-react';

interface Props extends InputProps {
  name: string;
  pointing?: boolean | 'above' | 'below' | 'left' | 'right';
}

const textField: React.FC<Props> = ({ name, pointing, ...props }: Props) => {
  const [, meta, helper] = useField(name);
  return (
    <>
      <Input
        {...props}
        onChange={(_, val: InputOnChangeData) => helper.setValue(val.value)}
        onBlur={() => helper.setTouched(true)}
        value={meta.value}
        error={meta.touched && meta.error !== undefined}
      />
      {meta.touched && meta.error !== undefined && (
        <Label basic color="red" pointing={pointing}>
          {meta.error}
        </Label>
      )}
    </>
  );
};

export default textField;
