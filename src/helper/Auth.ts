/* eslint-disable no-console */
import { Auth } from 'aws-amplify';
import { AmplifySignInType, AUTH_STATUS } from '../modules/Auth';

export const signOut = async (): Promise<void> => {
  try {
    await Auth.signOut();
    localStorage.setItem('AuthState', AUTH_STATUS.NOT_SIGN_IN);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signIn = async (
  loginId: string,
  password: string
): Promise<{
  user: AmplifySignInType;
  status: string;
}> => {
  try {
    const user: AmplifySignInType = await Auth.signIn(loginId, password);
    switch (user.challengeName) {
      case 'NEW_PASSWORD_REQUIRED':
        return {
          user,
          status: AUTH_STATUS.NEW_PASSWORD_REQUIRED,
        };
      case undefined:
        await setSignInSession();
        return {
          user,
          status: AUTH_STATUS.SIGN_IN,
        };
      default:
        throw Error('The challengeName is unexpected.');
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const passwordChange = async (
  user: AmplifySignInType,
  password: string
): Promise<string> => {
  try {
    const { challengeParam } = user;
    await Auth.completeNewPassword(user, password, challengeParam?.requiredAttributes);
    await setSignInSession();
    return AUTH_STATUS.SIGN_IN;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const setSignInSession = async (): Promise<void> => {
  const session = await Auth.currentSession();
  if (session === undefined) {
    throw Error('Session is undefined');
  }
  localStorage.setItem('AuthState', AUTH_STATUS.SIGN_IN);
};
