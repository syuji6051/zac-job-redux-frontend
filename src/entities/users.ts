/* eslint-disable camelcase */
export interface OtherUserInfo {
  tenantId: string;
  userId: string;
  password: string;
}

export interface GetUsersListResponse {
  pagination_token: string | undefined;
  users: {
    user_name?: string;
    enabled?: boolean;
    user_status?: string;
    is_admin: boolean;
  }[];
}

export interface User {
  userName?: string;
  enabled?: boolean;
  userStatus?: string;
  isAdmin: boolean;
}

export interface UsersList {
  paginationToken: string | undefined;
  users: User[];
}
export interface UserInfo {
  obcTenantId: string;
  obcUserId: string;
  zacTenantId: string;
  zacUserId: string;
  slackUserName: string;
}
