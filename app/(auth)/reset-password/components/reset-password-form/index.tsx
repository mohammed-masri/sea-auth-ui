"use client";
import { Button } from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import AuthActionInstance from "@/store/slices/auth/actions";
import { Constants } from "@/config";
import { pushNewAlert } from "@/store/slices/alert/slice";

type Values = {
  password: string;
  confirmPassword: string;
};
const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const identifier =
    localStorage.getItem(Constants.LocalStorageKeys.ResetPasswordIdentifier) +
    "";
  const otpCode =
    localStorage.getItem(Constants.LocalStorageKeys.ResetPasswordCode) + "";

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.resetPassword(identifier, otpCode, values.password)
      .then(() => {
        dispatch(
          pushNewAlert({
            message: `The password has been reset successfully`,
            type: "success",
            theme: "light",
          })
        );

        localStorage.removeItem(
          Constants.LocalStorageKeys.ResetPasswordIdentifier
        );
        localStorage.removeItem(Constants.LocalStorageKeys.ResetPasswordCode);

        router.push("/login");
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
    validationSchema: FormValidationUtils.Auth.resetPasswordValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>New Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your new password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Confirm Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
            />
          </div>
        </div>

        <Button
          type="submit"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid}
          className="uppercase px-4 py-2 bg-primary-light"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
