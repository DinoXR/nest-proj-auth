import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ConfirmSignUpObject,
  LoginObject,
  RegisterObject,
  ResendCodeObject,
  confirmSignUpCognitoInput,
  initiateAuthCognitoInput,
  signUpCognitoInput,
} from 'src/interfaces/types';
import { hashSecretCognito } from 'src/util/hash.util';
import { CognitoService } from './cognito.service';
import { fetchData } from 'src/util/fetch-api';
import { ErrorMessages, ResponseStatus, SuccessMessages } from 'src/util/enums';
import {
  confirmSignupObjectValidator,
  loginObjectValidator,
  registerObjectValidator,
  resendCodeObjectValidator,
} from 'src/validators/auth-validator';

@Injectable()
export class AuthService {
  private clientId = process.env.COGNITO_CLIENT_ID;
  cognito = new CognitoService();

  async login(body: LoginObject) {
    try {
      const { error } = loginObjectValidator(body);
      if (error) {
        const errorMessage = error.details[0]?.message.replace(/["\\]/g, '');
        throw new UnauthorizedException(errorMessage);
      }

      const { email, password } = body;
      const input: initiateAuthCognitoInput = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          SECRET_HASH: hashSecretCognito(email),
          USERNAME: email,
          PASSWORD: password,
        },
      };

      const loginData = await this.cognito.initiateAuth(input);

      return {
        status: ResponseStatus.SUCCESS,
        data: {
          idToken: loginData.idToken,
          refreshToken: loginData.refreshToken,
        },
        message: SuccessMessages.LOGIN_SUCCESSFUL,
      };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException(err.message);
    }
  }

  async register(userDetails: RegisterObject) {
    try {
      const { error } = registerObjectValidator(userDetails);
      if (error) {
        const errorMessage = error.details[0]?.message.replace(/["\\]/g, '');
        throw new UnauthorizedException(errorMessage);
      }
      const { email, password, fullName, dob } = userDetails;

      const signUpInput: signUpCognitoInput = {
        ClientId: this.clientId,
        SecretHash: hashSecretCognito(email),
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
        ],
      };

      const userId = await this.cognito.signUp(signUpInput);

      if (!userId) {
        throw new UnauthorizedException(ErrorMessages.COGNITO_SIGNUP_FAILED);
      }

      const userData = {
        id: userId,
        email,
        fullName,
        dob,
        preferences: [],
      };

      const userSaveData = await fetchData(
        `${process.env.API_URL}/users`,
        'POST',
        userData,
      );

      if (userSaveData.status !== ResponseStatus.SUCCESS) {
        throw new InternalServerErrorException(
          ErrorMessages.FAILED_TO_SAVE_USER,
        );
      }

      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.REGISTRATION_SUCCESSFUL,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(error.message);
    }
  }

  async confirmSignup(body: ConfirmSignUpObject) {
    try {
      const { error } = confirmSignupObjectValidator(body);
      if (error) {
        const errorMessage = error.details[0]?.message.replace(/["\\]/g, '');
        throw new UnauthorizedException(errorMessage);
      }

      const { email, code } = body;

      const input: confirmSignUpCognitoInput = {
        ClientId: this.clientId,
        ConfirmationCode: code.trim(),
        SecretHash: hashSecretCognito(email),
        Username: email,
      };

      await this.cognito.confirmSignUp(input);

      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.ACCOUNT_ACTIVATED_SUCCESSFULLY,
      };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException(err.message);
    }
  }

  async resendConfirmCode(body: ResendCodeObject) {
    try {
      const { error } = resendCodeObjectValidator(body);
      if (error) {
        const errorMessage = error.details[0]?.message.replace(/["\\]/g, '');
        throw new UnauthorizedException(errorMessage);
      }
      const { email } = body;
      const input = {
        ClientId: this.clientId,
        SecretHash: hashSecretCognito(email),
        Username: email,
      };

      await this.cognito.resendConfirmationCode(input);

      return {
        status: ResponseStatus.SUCCESS,
        message: SuccessMessages.RESEND_CODE_SUCCESSFUL,
      };
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException(err.message);
    }
  }
}
