import { API } from 'aws-amplify';
import { AxiosError } from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const setSlackAuth = async (code: string): Promise<void> =>
  API.post('work', '/slack/auth', {
    body: {
      code,
    },
  }).catch((err: AxiosError) => {
    console.log(err.response?.data);

    if (
      err.response?.status === 500 &&
      err.response?.data.message === 'An API error occurred: code_already_used'
    ) {
      throw Error('CodeAlreadyUsedError');
    }
    throw err;
  });
