import * as Yup from "yup";
import CommonValidations from "../common";

export const loginFormValidation = () => {
  return Yup.object({
    email: CommonValidations.email,
    password: CommonValidations.password,
  });
};

export const signUpFormValidation = () => {
  return Yup.object({
    name: CommonValidations.name,
    email: CommonValidations.email,
    phoneNumber: CommonValidations.phoneNumber,
    password: CommonValidations.password,
    confirmPassword: CommonValidations.confirmPassword,
  });
};

export const forgotPasswordValidation = () => {
  return Yup.object({
    identifier: CommonValidations.identifier,
  });
};

export const checkOTPValidityValidation = (length: number) => {
  return Yup.object({
    otpCode: CommonValidations.otpCode(length),
  });
};

export const resetPasswordValidation = () => {
  return Yup.object({
    password: CommonValidations.password,
    confirmPassword: CommonValidations.confirmPassword,
  });
};

export const changePasswordValidation = () => {
  return Yup.object({
    oldPassword: CommonValidations.password,
    password: CommonValidations.password,
    confirmPassword: CommonValidations.confirmPassword,
  });
};
