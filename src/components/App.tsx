import React from 'react';
import amplify from 'aws-amplify';
import 'semantic-ui-css/semantic.min.css';

import config from '../amplify-config';
import Routers from './routers';

amplify.configure(config);

const App: React.FC = () => {
  return (
    <>
      <Routers />
    </>
  );
};

export default App;
