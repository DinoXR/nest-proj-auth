export enum StatusCodes {
  OK = 200,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
  INVALID_METHOD = 405,
  INVALID_FORMAT = 403,
  UNAUTHORIZED = 401,
  CREATED = 201,
  DELETED = 204,
}

export enum ErrorMessages {
  UNAUTHORIZED = 'Unauthorized',
  USER_NOT_FOUND = 'User not found',
  ERROR_SAVING_USER = 'Error saving user',
  REGISTRATION_FAILED = 'Registration failed',
  CONFIRMATION_FAILED = 'Confirmation failed',
  RESEND_CODE_FAILED = 'Resend code failed',
  COGNITO_SIGNUP_FAILED = 'Cognito signup failed',
  FAILED_TO_SAVE_USER = 'Failed to save user',
}

export enum ResponseStatus {
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export enum SuccessMessages {
  PREFERENCES_FETCHED_SUCCESSFULLY = 'Preferences fetched successfully',
  USER_CREATED_SUCCESSFULLY = 'User created successfully',
  USER_FETCHED_SUCCESSFULLY = 'User fetched successfully',
  USER_UPDATED_SUCCESSFULLY = 'User updated successfully',
  USER_DELETED_SUCCESSFULLY = 'User deleted successfully',
  PREFERENCES_MANAGED_SUCCESSFULLY = 'Preferences managed successfully',
  LOGIN_SUCCESSFUL = 'Login successful',
  REGISTRATION_SUCCESSFUL = 'Registration successful',
  RESEND_CODE_SUCCESSFUL = 'Code resent successfully',
  ACCOUNT_ACTIVATED_SUCCESSFULLY = 'Account activated successfully',
}
