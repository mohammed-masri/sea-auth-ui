"use client";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import AuthActionInstance from "@/store/slices/auth/actions";
import { setAuthData } from "@/store/slices/auth/slice";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { Button, Input } from "sea-react-components";

type Values = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

const initialValues: Values = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.changePassword(values.oldPassword, values.password)
      .then(() => {
        dispatch(setAuthData(undefined));
        dispatch(
          pushNewAlert({
            message: "Your password has been changed successfully",
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
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Auth.changePasswordValidation,
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>Current Password</label>
            <Input
              id="oldPassword"
              name="oldPassword"
              placeholder="Your current password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              errorMessage={formik.errors.oldPassword}
            />
          </div>

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
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.isValid}
            className="uppercase px-4 py-2 bg-primary-light"
          >
            Change password
          </Button>
        </div>
      </div>
    </form>
  );
}
