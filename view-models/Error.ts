import {getErrorCode} from '../errors/ServerError';

export const getErrorMessageCode = (error, messageMap?: object): string => {
  const errorCode = getErrorCode(error);

  if (messageMap && messageMap[errorCode]) {
    return `error.${messageMap[errorCode]}`;
  }

  return errorCode && /^\w+$/.test(errorCode)
    ? `error.${errorCode}`
    : error.message;
};

enum ErrorCode {
  InvalidCredentials = 'invalid_credentials_username',
  DuplicateCredentials = 'duplicated_email_or_username',
  NetworkError = 'networkError',
  EmailNotFound = 'user_not_found',
  InvalidCurrentPassword = 'invalid_current_password',
  SameCurrentPassword = 'same_current_password',
}

export const getMessage: {[T: string]: string} = {
  [ErrorCode.InvalidCredentials]: 'Invalid username or password.',
  [ErrorCode.DuplicateCredentials]: 'Username or Email already exists.',
  [ErrorCode.NetworkError]: 'Network Error.',
  [ErrorCode.EmailNotFound]: 'Email not found.',
  [ErrorCode.InvalidCurrentPassword]: 'Invalid current password.',
  [ErrorCode.SameCurrentPassword]:
    'The new password is the same as the current one.',
};

export const getErrorMessage = (error: unknown): string => {
  const errorCode = getErrorCode(error);
  return getMessage[errorCode];
};
