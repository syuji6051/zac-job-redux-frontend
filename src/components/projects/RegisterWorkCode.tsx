import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, List, Form, Checkbox, CheckboxProps, Icon, Label } from 'semantic-ui-react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { getWorkCodeList, setWorkCodeList } from '../../helper/work-code';
import { ZacWorkCodeResponse } from '../../entities/work-code';
import UiForm from '../ui/Form';
import TextField from '../ui/TextField';
import loginClasses from '../../styles/components/extends-login.module.css';
import classes from '../../styles/components/register-work-code.module.css';

interface Schema {
  workCode: string;
}

const validation = Yup.object().shape({
  workCode: Yup.string().min(6, '6文字以上で入力してください'),
});

const registerWorkCode: React.FC = () => {
  const [stateWorkCodeList, setStateWorkCodeList] = useState([] as ZacWorkCodeResponse);
  const [stateYearMonth, setStateYearMonth] = useState(dayjs().toDate());
  const [stateErrorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: { workCode: '' },
    onSubmit: (val) => onPressAddWorkCode(val),
    validationSchema: validation,
    validateOnMount: true,
  });

  useEffect(() => {
    (async () => {
      const res = await getWorkCodeList(dayjs(stateYearMonth).format('YYYYMM'));
      setStateWorkCodeList(res);
    })();
  }, []);

  const onPressAddWorkCode = async ({ workCode }: Schema) => {
    const workCodeList = [...stateWorkCodeList, { code: workCode, default: false }];
    await saveWorkCodeList(workCodeList);
  };

  const onClickYearMonth = async (event: React.MouseEvent, inc: number) => {
    event.preventDefault();
    formik.setFieldValue('workCode', '');
    // console.log(stateYearMonth.format('YYYY/MM/DD'));
    const addYearMonth = dayjs(stateYearMonth).add(inc, 'month');
    setStateYearMonth(addYearMonth.toDate());
    // console.log(stateYearMonth.format('YYYY/MM/DD'));
    // console.log(stateYearMonth.format('YYYYMM'));
    // setStateYearMonth(stateYearMonth.add(inc, 'month'));
    const res = await getWorkCodeList(addYearMonth.format('YYYYMM'));
    setStateWorkCodeList(res);
  };

  const onChangeWorkCode = async (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    event.preventDefault();
    const workCodeList = stateWorkCodeList.map((workCode) => ({
      ...workCode,
      default: workCode.code === data.value,
    }));
    await saveWorkCodeList(workCodeList);
  };

  const onDeleteWorkCode = async (event: React.MouseEvent, code: string) => {
    event.preventDefault();
    const workCodeList = stateWorkCodeList.filter((workCode) => workCode.code !== code);
    await saveWorkCodeList(workCodeList);
  };

  const saveWorkCodeList = async (workCodeList: ZacWorkCodeResponse) => {
    try {
      await setWorkCodeList(dayjs(stateYearMonth).format('YYYYMM'), workCodeList);
      setStateWorkCodeList(workCodeList);
      setErrorMessage('');
    } catch (err) {
      if (err instanceof Error) {
        const message =
          err.message === 'UniqueCodeError'
            ? '入力されたコードは既に登録されています'
            : 'サーバーエラーが発生しました';
        setErrorMessage(message);
      }
    }
  };

  return (
    <div>
      <UiForm formik={formik} className={loginClasses.form}>
        <h3>ワークコード入力</h3>
        <div className={classes.yearMonth}>
          <Button size="mini" onClick={(e) => onClickYearMonth(e, -1)}>
            <Icon name="angle left" size="large" />
          </Button>
          <p className={classes.yearMonthLabel}>{dayjs(stateYearMonth).format('YYYY年MM月')}</p>
          <Button size="mini" onClick={(e) => onClickYearMonth(e, 1)}>
            <Icon name="angle right" size="large" />
          </Button>
        </div>
        <TextField
          name="workCode"
          size="large"
          placeholder="ワークコードを入力"
          type="text"
          className={classes.workCodeText}
        />
        <Button size="large" color="orange" type="submit">
          登録
        </Button>
        {stateErrorMessage ? (
          <Label basic color="red" pointing="above">
            {stateErrorMessage}
          </Label>
        ) : (
          <div />
        )}
        <List divided>
          {stateWorkCodeList.map((workCode, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <List.Item key={`${workCode.code}:${index}`}>
              <List.Content className={classes.listContent}>
                <Form.Field>
                  <Checkbox
                    radio
                    label={workCode.code}
                    name="defaultWorkCodeRadioGroup"
                    value={workCode.code}
                    checked={workCode.default}
                    onChange={onChangeWorkCode}
                  />
                </Form.Field>
                <Button
                  size="mini"
                  className={classes.deleteButton}
                  color="red"
                  onClick={(e) => onDeleteWorkCode(e, workCode.code)}
                >
                  削除
                </Button>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </UiForm>
    </div>
  );
};

export default registerWorkCode;
