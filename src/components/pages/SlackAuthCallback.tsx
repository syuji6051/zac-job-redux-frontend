import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const slackAuthCallback: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      // const location = useLocation();
      console.log(location.search);
    })();
  }, []);

  return <div>Slackユーザ情報取得中</div>;
};

export default slackAuthCallback;
