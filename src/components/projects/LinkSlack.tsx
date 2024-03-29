import React from 'react';
import { Button } from 'semantic-ui-react';
import queryString from 'query-string';
import classes from '../../styles/components/extends-login.module.css';

interface Props {
  slackUserName: string | undefined;
}

const linkSlack: React.FC<Props> = ({ slackUserName }: Props) => {
  const onClickLinkSlack = () => {
    const { REACT_APP_SLACK_CLIENT_ID, REACT_APP_SLACK_REDIRECT_URL } = process.env;
    const query = {
      client_id: REACT_APP_SLACK_CLIENT_ID,
      scope: 'identify',
      redirect_uri: `${REACT_APP_SLACK_REDIRECT_URL}/auth/slack`,
    };
    window.open(`https://slack.com/oauth/authorize?${queryString.stringify(query)}`, '_blank');
  };
  return (
    <div className={classes.form}>
      <h3>Slack連携</h3>
      <Button
        type="submit"
        size="large"
        color="orange"
        className={classes.registerButton}
        onClick={() => onClickLinkSlack()}
      >
        {slackUserName ? '連携済み' : '連携する'}
      </Button>
    </div>
  );
};

export default linkSlack;
