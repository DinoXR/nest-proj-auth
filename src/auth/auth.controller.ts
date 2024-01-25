import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  ResendCodeObject,
  ConfirmSignUpObject,
  LoginObject,
  RegisterObject,
} from 'src/interfaces/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginObject) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterObject) {
    return this.authService.register(body);
  }

  @Post('account')
  async confirmSignup(@Body() body: ConfirmSignUpObject) {
    return this.authService.confirmSignup(body);
  }

  @Post('code')
  async resendConfirmCode(@Body() body: ResendCodeObject) {
    return this.authService.resendConfirmCode(body);
  }
}
