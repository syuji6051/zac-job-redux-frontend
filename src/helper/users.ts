import { API } from 'aws-amplify';
import { GetUsersListResponse, OtherUserInfo, UserInfo, UsersList } from '../entities/users';

const getUsersList = async (): Promise<UsersList> => {
  return API.get('work', '/admin/users/list', {}).then((res: GetUsersListResponse) => ({
    users: res.users.map((user) => ({
      userName: user.user_name,
      enabled: user.enabled,
      userStatus: user.user_status,
      isAdmin: user.is_admin,
    })),
    paginationToken: res.pagination_token,
  }));
};

const putZacInfo = async ({ tenantId, userId, password }: OtherUserInfo): Promise<void> => {
  await API.put('work', '/users/user-info/zac', {
    body: {
      zac_tenant_id: tenantId,
      zac_user_id: userId,
      zac_password: password,
    },
  });
};

const putObcInfo = async ({ tenantId, userId, password }: OtherUserInfo): Promise<void> => {
  await API.put('work', '/users/user-info/obc', {
    body: {
      obc_tenant_id: tenantId,
      obc_user_id: userId,
      obc_password: password,
    },
  });
};

const getUserInfo = async (): Promise<UserInfo> => {
  return API.get('work', '/users/user-info', {}).then((res) => ({
    obcTenantId: res.obc_tenant_id,
    obcUserId: res.obc_user_id,
    zacTenantId: res.zac_tenant_id,
    zacUserId: res.zac_user_id,
    slackUserName: res.slack_user_name,
  }));
};

export { putZacInfo, putObcInfo, getUserInfo, getUsersList };
