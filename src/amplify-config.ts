/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Auth } from 'aws-amplify';

export default {
  // aws_appsync_graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT_URL,
  // aws_appsync_region: 'ap-northeast-1',
  // aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  // API: {
  //   endpoints: [
  //     {
  //       name: 'admin-cognito-user',
  //       endpoint: process.env.REACT_APP_API_ENDPOINT_BASE_URL,
  //       custom_header: async () => {
  //         // Alternatively, with Cognito User Pools use this:
  //         return {
  //           Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
  //         };
  //       },
  //     },
  //   ],
  // },
  Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.REACT_APP_USER_POOL,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.REACT_APP_WEB_CLIENT_ID,
  },
};
