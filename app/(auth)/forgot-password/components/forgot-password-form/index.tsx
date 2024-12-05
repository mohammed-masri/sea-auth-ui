"use client";
import { Button } from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import AuthActionInstance from "@/store/slices/auth/actions";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";
import { Constants } from "@/config";

type Values = {
  identifier: string;
};
const initialValues = {
  identifier: "",
};

export default function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.requestOTP(values.identifier)
      .then(() => {
        dispatch(
          pushNewAlert({
            message: `OTP has been sent successfully to ${values.identifier}`,
            type: "success",
            theme: "light",
          })
        );

        localStorage.setItem(
          Constants.LocalStorageKeys.ResetPasswordIdentifier,
          values.identifier
        );

        router.push("/otp-validation");
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
    validationSchema: FormValidationUtils.Auth.forgotPasswordValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>Identifier</label>
            <Input
              id="identifier"
              name="identifier"
              placeholder="Your identifier"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.identifier}
              errorMessage={formik.errors.identifier}
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
