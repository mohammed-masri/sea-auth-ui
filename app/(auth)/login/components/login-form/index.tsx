"use client";
import { Button } from "sea-react-components";
import { Input, Toggle } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import { useRouter } from "next/navigation";
import AuthActionInstance from "@/store/slices/auth/actions";

type Values = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const initialValues: Values = {
  email: "",
  password: "",
  rememberMe: false,
};

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.login(values.email, undefined, values.password)
      .then((response) => {
        AuthActionInstance.handleSuccessLogin(
          response,
          dispatch,
          router,
          localStorage
        );
      })
      .catch((error) => {
        dispatch(
          pushNewAlert({
            message: error.message,
            type: "error",
            theme: "default",
          })
        );
      })
      .finally(() => {
        formikHelpers.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Auth.loginFormValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <Input
              id="email"
              name="email"
              placeholder="Your email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              errorMessage={formik.errors.email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              errorMessage={formik.errors.password}
            />
          </div>

          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <Toggle
                checked={formik.values.rememberMe}
                onChange={(checked) =>
                  formik.setFieldValue("rememberMe", checked)
                }
              />

              <label>Remember Me</label>
            </div>

            <Link href="/forgot-password" className="text-text">
              Forgot password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !formik.isValid}
          className="uppercase px-4 py-2 bg-primary-light"
        >
          Sign In
        </Button>
      </div>
    </form>
  );
}
