import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { signOut } from '../../helper/Auth';
import { AuthActions } from '../../modules/Auth';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    await signOut();
    dispatch(AuthActions.signOut());
  };

  return (
    <div>
      <Button onClick={() => handleSignOut()}>ログアウト</Button>
    </div>
  );
};

export default Home;
