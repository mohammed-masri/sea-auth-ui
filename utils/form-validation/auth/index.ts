/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ValidationUtils } from "sea-react-components";

export const loginFormValidation = () => {
  return Yup.object({
    email: ValidationUtils.email as any,
    password: ValidationUtils.password as any,
  });
};

export const signUpFormValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,
    email: ValidationUtils.email as any,
    phoneNumber: ValidationUtils.phoneNumber as any,
    password: ValidationUtils.password as any,
    confirmPassword: ValidationUtils.confirmPassword as any,
  });
};

export const forgotPasswordValidation = () => {
  return Yup.object({
    identifier: ValidationUtils.identifier as any,
  });
};

export const checkOTPValidityValidation = (length: number) => {
  return Yup.object({
    otpCode: ValidationUtils.otpCode(length) as any,
  });
};

export const resetPasswordValidation = () => {
  return Yup.object({
    password: ValidationUtils.password as any,
    confirmPassword: ValidationUtils.confirmPassword as any,
  });
};

export const changePasswordValidation = () => {
  return Yup.object({
    oldPassword: ValidationUtils.password as any,
    password: ValidationUtils.password as any,
    confirmPassword: ValidationUtils.confirmPassword as any,
  });
};
