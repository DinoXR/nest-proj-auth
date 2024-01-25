import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import {
  signUpCognitoInput,
  confirmSignUpCognitoInput,
  initiateAuthCognitoInput,
  resendConfirmationCodeInput,
} from 'src/interfaces/types';

export class CognitoService {
  cognitoClient: CognitoIdentityProviderClient;

  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: process.env.REGION,
    });
  }

  async confirmSignUp(input: confirmSignUpCognitoInput) {
    const authChallenge = new ConfirmSignUpCommand(input);
    const response = await this.cognitoClient.send(authChallenge);

    return response;
  }

  async resendConfirmationCode(input: resendConfirmationCodeInput) {
    const authChallenge = new ResendConfirmationCodeCommand(input);
    const response = await this.cognitoClient.send(authChallenge);

    return response;
  }

  async initiateAuth(input: initiateAuthCognitoInput) {
    const initAuth = new InitiateAuthCommand(input);
    const response = await this.cognitoClient.send(initAuth);
    return {
      accessToken: response.AuthenticationResult.AccessToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      idToken: response.AuthenticationResult.IdToken,
      expiresIn: response.AuthenticationResult.ExpiresIn,
    };
  }

  async signUp(input: signUpCognitoInput) {
    const createUser = new SignUpCommand(input);
    const response = await this.cognitoClient.send(createUser);

    if (response.$metadata.httpStatusCode === 200) {
      return response.UserSub;
    }
    return null;
  }

  async forgotPassword(input) {
    const codeRequest = new ForgotPasswordCommand(input);
    const response = await this.cognitoClient.send(codeRequest);
    return response;
  }

  async confirmForgotPassword(input) {
    const codeRequest = new ConfirmForgotPasswordCommand(input);
    const response = await this.cognitoClient.send(codeRequest);
    return response;
  }
}
