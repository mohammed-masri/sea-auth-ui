import { APIsConfig, Constants } from "@/config";
import { ILoginResponse } from "@/dto/auth";
import { AppDispatch } from "@/store/store";
import axiosInstance from "@/utils/axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { setAuthData } from "./slice";
import { pushNewAlert } from "../alert/slice";
import { IAccount } from "@/dto/account";
import { StringUtils } from "sea-react-components";

class AuthAction {
  private static instance: AuthAction;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  // Public static method to get the instance
  public static getInstance(): AuthAction {
    if (!AuthAction.instance) {
      AuthAction.instance = new AuthAction();
    }
    return AuthAction.instance;
  }

  handleSuccessLogin(
    response: ILoginResponse,
    dispatch: AppDispatch,
    router: AppRouterInstance,
    localStorage: Storage
  ) {
    dispatch(setAuthData(response));

    localStorage.setItem(
      Constants.LocalStorageKeys.JWTToken,
      response.accessToken
    );

    router.push("/dashboard");

    dispatch(
      pushNewAlert({
        message: `Hi, ${response.account.name}! Welcome Back`,
        type: "info",
        theme: "light",
      })
    );

    dispatch(
      pushNewAlert({
        message: "Login success",
        type: "success",
        theme: "light",
      })
    );
  }

  login(
    email: string | undefined,
    phoneNumber: string | undefined,
    password: string
  ) {
    return axiosInstance
      .post(APIsConfig.APIs.Microsoft.auth.login, {
        email,
        phoneNumber,
        password,
      })
      .then((response) => response as unknown as ILoginResponse);
  }

  microsoftLogin(idToken: string) {
    return axiosInstance
      .post(APIsConfig.APIs.Microsoft.auth.microsoftLogin, {
        idToken,
      })
      .then((response) => response as unknown as ILoginResponse);
  }

  updateProfile(name: string, birthDate: string | undefined) {
    return axiosInstance
      .put(APIsConfig.APIs.Microsoft.auth.updateProfile, {
        name,
        birthDate,
      })
      .then((response) => response as unknown as IAccount);
  }

  changePassword(oldPassword: string, newPassword: string) {
    return axiosInstance
      .put(APIsConfig.APIs.Microsoft.auth.changePassword, {
        oldPassword,
        newPassword,
      })
      .then((response) => response as unknown as boolean);
  }

  requestOTP(identifier: string) {
    let email: string | undefined = undefined,
      phoneNumber: string | undefined = undefined;
    if (StringUtils.isEmail(identifier)) email = identifier;
    else phoneNumber = identifier;
    return axiosInstance
      .post(APIsConfig.APIs.Microsoft.auth.requestOTP, {
        email,
        phoneNumber,
      })
      .then((response) => response as unknown as boolean);
  }

  checkOTPValidity(identifier: string, OTPCode: string) {
    let email: string | undefined = undefined,
      phoneNumber: string | undefined = undefined;
    if (StringUtils.isEmail(identifier)) email = identifier;
    else phoneNumber = identifier;
    return axiosInstance
      .post(APIsConfig.APIs.Microsoft.auth.checkOTPValidity, {
        email,
        phoneNumber,
        OTPCode,
      })
      .then((response) => response as unknown as boolean);
  }

  resetPassword(identifier: string, OTPCode: string, newPassword: string) {
    let email: string | undefined = undefined,
      phoneNumber: string | undefined = undefined;
    if (StringUtils.isEmail(identifier)) email = identifier;
    else phoneNumber = identifier;
    return axiosInstance
      .put(APIsConfig.APIs.Microsoft.auth.resetPassword, {
        email,
        phoneNumber,
        OTPCode,
        newPassword,
      })
      .then((response) => response as unknown as boolean);
  }
}

const AuthActionInstance = AuthAction.getInstance();

export default AuthActionInstance;
