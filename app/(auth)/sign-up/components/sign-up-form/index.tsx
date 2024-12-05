"use client";
import { Button } from "sea-react-components";
import { Input } from "sea-react-components";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";

type Values = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    setTimeout(() => {
      window.alert(JSON.stringify(values));
      formikHelpers.setSubmitting(false);
    }, 2000);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: FormValidationUtils.Auth.signUpFormValidation,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              errorMessage={formik.errors.name}
            />
          </div>
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
            <label>Phone Number</label>

            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Your phone number"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              errorMessage={formik.errors.phoneNumber}
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
          Sign Up
        </Button>
      </div>
    </form>
  );
}
