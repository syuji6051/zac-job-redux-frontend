import React from 'react';
import { getUsersList } from '../../helper/users';

const userList: React.FC = () => {
  React.useEffect(() => {
    (async () => {
      const users = await getUsersList();
      console.log(users);
    })();
  });

  return <div>aaaaa</div>;
};

export default userList;
