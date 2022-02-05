import { API } from 'aws-amplify';
import { AxiosError } from 'axios';
import { ZacWorkCodeResponse } from '../schema/work-code';

// eslint-disable-next-line import/prefer-default-export
export const getWorkCodeList = (yearMonth: string): Promise<ZacWorkCodeResponse> =>
  API.get('cognito-user', '/zac/works/code-list', {
    queryStringParameters: {
      year_month: yearMonth,
    },
  });

export const setWorkCodeList = async (
  yearMonth: string,
  workCodeList: ZacWorkCodeResponse
): Promise<void> => {
  await API.post('cognito-user', '/zac/works/code-list', {
    body: {
      year_month: yearMonth,
      code_list: workCodeList,
    },
  }).catch((err: AxiosError) => {
    if (
      err.response?.status === 400 &&
      err.response?.data.message === 'work code unique key error'
    ) {
      throw Error('UniqueCodeError');
    }
    throw err;
  });
};
