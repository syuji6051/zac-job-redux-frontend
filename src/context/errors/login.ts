interface ErrorMessages {
  [key: string]: string;
}

const errorMessage: ErrorMessages = {
  UserNotFoundException: 'ユーザ名またはパスワードが間違っています。',
  NotAuthorizedException: 'ユーザ名またはパスワードが間違っています。',
  UsernameExistsException: '入力されたメールアドレスは既に存在しています。',
  CodeMismatchException: '検証コードが無効です。もう一度お試しください。',
  ExpiredCodeException: '検証コードが無効です。もう一度お試しください。',
  InvalidPasswordException: 'パスワードポリシーに違反しています。パスワードを長くしてください。',
};

export default errorMessage;
