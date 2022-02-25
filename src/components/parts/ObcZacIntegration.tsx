import React from 'react';
import { DateInput } from 'semantic-ui-calendar-react';
import { Button } from 'semantic-ui-react';
import dayjs from 'dayjs';
import classes from '../../styles/components/zac-work.module.scss';
import { registerZacWork } from '../../helper/zac';

const obcZacIntegration: React.FC = () => {
  const [date, setDate] = React.useState(dayjs().format('YYYY-MM-DD'));

  const onSubmitObcZacIntegration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await registerZacWork(dayjs(date, 'YYYY-MM-DD'));
  };

  return (
    <form className={classes.categoryContainer} onSubmit={(e) => onSubmitObcZacIntegration(e)}>
      <h3>連携手動連携</h3>
      <div className={classes.manuelInput}>
        <DateInput
          value={date}
          onChange={(_, data) => setDate(data.value)}
          dateFormat="YYYY-MM-DD"
          localization="ja-JP"
          closable
        />
        <Button type="submit" content="登録" color="green" />
      </div>
    </form>
  );
};

export default obcZacIntegration;
