import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Button } from 'semantic-ui-react';
import { setSlackAuth } from '../../helper/slack-auth';
import classes from '../../styles/components/slack-auth.module.css';

type STATUS = 'LOADING' | 'SUCCESS' | 'ERROR';

const slackAuthCallback: React.FC = () => {
  const location = useLocation();

  const [status, setStatus] = useState<STATUS>('LOADING');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { code } = queryString.parse(location.search);
      if (code == null || typeof code === 'object') {
        setError('codeが指定されていないか、不正な値が入力されました。');
        return;
      }
      await setSlackAuth(code)
        .then(() => {
          setStatus('SUCCESS');
          // window.close();
        })
        .catch((err: Error) => {
          setStatus('ERROR');
          if (err.message === 'CodeAlreadyUsedError') {
            setError('指定されたcodeは既に登録済みです。');
            return;
          }
          setError(err.message);
        });
    })();
  }, []);

  return (
    <div className={classes.container}>
      {status === 'LOADING' && (
        <>
          <img className={classes.logo} src={`${process.env.PUBLIC_URL}/loading.svg`} alt="error" />
          <span className={classes.message}>Slackユーザ情報取得中...</span>
        </>
      )}
      {status === 'ERROR' && (
        <>
          <img className={classes.logo} src={`${process.env.PUBLIC_URL}/close.png`} alt="error" />
          <span className={classes.message}>Slackユーザ情報取得に失敗しました</span>
          <span className={classes.errorMessage}>{error}</span>
          <span>このウィンドウを閉じて再度やり直してください</span>
        </>
      )}
      {status === 'SUCCESS' && (
        <>
          <img
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/correct.png`}
            alt="success"
          />
          <span className={classes.message}>Slackユーザ情報取得できました</span>
          <span>このウィンドウを閉じてください</span>
        </>
      )}
      <div className={classes.spacer} />
      <Button onClick={() => window.close()} color="orange">
        閉じる
      </Button>
    </div>
  );
};

export default slackAuthCallback;
