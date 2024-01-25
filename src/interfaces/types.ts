export enum ActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get',
}

export type initiateAuthCognitoInput = {
  AuthFlow: 'USER_PASSWORD_AUTH';
  ClientId: string;
  AuthParameters: {
    SECRET_HASH: string;
    USERNAME: string;
    PASSWORD: string;
  };
};

export type LoginObject = {
  email: string;
  password: string;
};

export type RegisterObject = {
  email: string;
  password: string;
  fullName: string;
  dob: string;
};

export type ConfirmSignUpObject = {
  email: string;
  code: string;
};

export type ResendCodeObject = {
  email: string;
};

export type confirmSignUpCognitoInput = {
  ClientId: string;
  ConfirmationCode: string;
  SecretHash: string;
  Username: string;
};
export type resendConfirmationCodeInput = {
  ClientId: string;
  SecretHash: string;
  Username: string;
};

export type signUpCognitoInput = {
  ClientId: string;
  SecretHash: string;
  Username: string;
  Password: string;
  UserAttributes: [
    {
      Name: string;
      Value: string;
    },
  ];
};
