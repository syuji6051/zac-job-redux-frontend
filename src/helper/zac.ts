import { API } from 'aws-amplify';
import { Dayjs } from 'dayjs';

// eslint-disable-next-line import/prefer-default-export
export const registerZacWork = (workDate: Dayjs): Promise<void> => {
  return API.post('work', '/zac/works/auto-link', {
    queryStringParameters: {
      day: workDate.format('YYYY/MM/DD'),
    },
  });
};
