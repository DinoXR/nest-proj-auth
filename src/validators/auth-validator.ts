import Joi from 'joi';
import {
  ConfirmSignUpObject,
  LoginObject,
  RegisterObject,
  ResendCodeObject,
} from 'src/interfaces/types';

export const loginObjectValidator = (request: LoginObject) => {
  const loginObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return loginObjectSchema.validate(request);
};

export const registerObjectValidator = (request: RegisterObject) => {
  const registerObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    dob: Joi.string().isoDate().required(),
  });
  return registerObjectSchema.validate(request);
};

export const confirmSignupObjectValidator = (request: ConfirmSignUpObject) => {
  const confirmSignUpObjectSchema = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
  });
  return confirmSignUpObjectSchema.validate(request);
};

export const resendCodeObjectValidator = (request: ResendCodeObject) => {
  const resendCodeObjectSchema = Joi.object({
    email: Joi.string().email().required(),
  });
  return resendCodeObjectSchema.validate(request);
};
