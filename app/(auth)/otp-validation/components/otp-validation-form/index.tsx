"use client";
import React, { useState } from "react";
import { Button } from "sea-react-components";
import { OTPInput } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import { Constants, ServerConfig } from "@/config";
import { CountDown } from "sea-react-components";
import AuthActionInstance from "@/store/slices/auth/actions";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";

type Values = {
  otpCode: string;
};
const initialValues = {
  otpCode: "",
};

export default function OtpValidationForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const identifier =
    localStorage.getItem(Constants.LocalStorageKeys.ResetPasswordIdentifier) +
    "";

  const [OTPExpired, setOTPExpired] = useState(false);

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.checkOTPValidity(identifier, values.otpCode)
      .then(() => {
        dispatch(
          pushNewAlert({
            message: `OTP is valid`,
            type: "success",
            theme: "light",
          })
        );

        localStorage.setItem(
          Constants.LocalStorageKeys.ResetPasswordCode,
          values.otpCode
        );

        router.push("/reset-password");
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            type: "error",
            theme: "light",
          })
        );
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Auth.checkOTPValidityValidation(
      ServerConfig.OTP_LENGTH
    ),
    onSubmit,
  });

  const handleClickResendCodeButton = () => {
    AuthActionInstance.requestOTP(identifier)
      .then(() => {
        dispatch(
          pushNewAlert({
            message: `OTP has been resent successfully to ${identifier}`,
            type: "success",
            theme: "light",
          })
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            type: "error",
            theme: "light",
          })
        );
      })
      .finally(() => {
        setOTPExpired(false);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          {" "}
          <OTPInput
            length={ServerConfig.OTP_LENGTH}
            onChange={(otpCode) => formik.setFieldValue("otpCode", otpCode)}
            errorMessage={formik.errors.otpCode}
          />
          <div className="flex items-center justify-center gap-3 text-sm">
            <p className=" text-text">OTP will be expired in</p>
            <p className="text-primary-light">
              {!OTPExpired ? (
                <CountDown
                  timeInSeconds={30}
                  finishObserver={() => {
                    setOTPExpired(true);
                  }}
                />
              ) : (
                <Button
                  type="button"
                  className="bg-transparent group"
                  onClick={handleClickResendCodeButton}
                >
                  <p className="text-primary-light group-hover:text-opacity-50">
                    Resend Code
                  </p>
                </Button>
              )}
            </p>
          </div>
        </div>

        <Button
          type="submit"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid}
          className="uppercase px-4 py-2 bg-primary"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
