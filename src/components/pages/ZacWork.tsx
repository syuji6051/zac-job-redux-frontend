/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { API } from 'aws-amplify';
import { Button, Dropdown, Input, Table } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import Form from '../ui/Form';
import classes from '../../styles/components/zac-work.module.css';

interface Schema {
  workDate: string;
  workStartHour: number;
}

const scheme = Yup.object().shape({
  workDate: Yup.string().required('登録日を入力してください'),
  workStartHour: Yup.number().required('開始時間を入力してください'),
});

const hourRecord = [...Array(23).keys()]
  .map((i) => i + 1)
  .map((key) => ({
    text: key,
    value: key,
  }));

const minuteRecord = [...Array(4).keys()]
  .map((i) => i * 15)
  .map((key) => ({
    text: key,
    value: key,
  }));

const ZacWork: React.FC = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const formik = useFormik({
    initialValues: { workDate: '', workStartHour: 0 },
    onSubmit: (val) => onSubmitZacWork(val),
    validationSchema: scheme,
    validateOnMount: true,
  });

  // const handleDatePicker = (data: SemanticDatepickerProps) => {
  //   if (data.value && !Array.isArray(data.value)) {
  //     setDate(data.value);
  //   }
  // };

  const onSubmitZacWork = async (val: Schema) => {
    await API.post('cognito-user', '/user/zac/work', {
      body: {
        workDate: '2021-04-23',
        workStartHour: 9,
        workStartMinute: 45,
        workEndHour: 19,
        workEndMinute: 0,
        workBreakHour: 1,
        workBreakMinute: 15,
        works: [
          {
            code: '0503261',
            hour: 8,
            minute: 0,
            text: 'RC：RC-Gateway 切り替え時の影響範囲調査¥nRC：障害調査、リカバリ対応',
          },
        ],
      },
    });
  };

  return (
    <div>
      <Form formik={formik} className={classes.form}>
        <div className={classes.formRow}>
          <label className={classes.label}>勤務日</label>
          <DateInput
            value={date}
            onChange={(e, data) => setDate(data.value)}
            dateFormat="YYYY-MM-DD"
            localization="ja-JP"
          />
        </div>
        <div className={classes.formRow}>
          <label className={classes.label}>開始時刻</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={hourRecord} />
          <label className={classes.label}>時</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={minuteRecord} />
          <label className={classes.label}>分</label>
        </div>
        <div className={classes.formRow}>
          <label className={classes.label}>終了時刻</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={hourRecord} />
          <label className={classes.label}>時</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={minuteRecord} />
          <label className={classes.label}>分</label>
        </div>
        <div className={classes.formRow}>
          <label className={classes.label}>休憩時間</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={hourRecord} />
          <label className={classes.label}>時間</label>
          <Dropdown search searchInput={{ type: 'number' }} selection options={minuteRecord} />
          <label className={classes.label}>分</label>
        </div>
        {/* <TextField name="workDate" placeholder="登録日" size="large" type="text" pointing="above" /> */}
        <Button type="submit" size="large" color="orange">
          登録
        </Button>
      </Form>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Notes</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>
              <Input />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>Requires call</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill</Table.Cell>
            <Table.Cell>Denied</Table.Cell>
            <Table.Cell>None</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ZacWork;
