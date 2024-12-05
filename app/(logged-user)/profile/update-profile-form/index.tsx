"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { pushNewAlert } from "@/store/slices/alert/slice";
import AuthActionInstance from "@/store/slices/auth/actions";
import { selectAccountData, setAccountData } from "@/store/slices/auth/slice";
import { FormValidationUtils } from "@/utils";
import { FormikHelpers, useFormik } from "formik";
import React from "react";
import { Input, Button } from "sea-react-components";

type Values = {
  name: string;
  birthDate: string;
};

export default function UpdateProfileForm() {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccountData);
  const initialValues: Values = {
    name: account?.name || "",
    birthDate: account?.birthDate || "",
  };

  const onSubmit = (values: Values, formikHelpers: FormikHelpers<Values>) => {
    AuthActionInstance.updateProfile(values.name, values.birthDate)
      .then((response) => {
        dispatch(setAccountData(response));
        dispatch(
          pushNewAlert({
            message: "Your profile has been updated successfully",
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
    validationSchema: FormValidationUtils.Profile.updateProfileFormValidation,
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
            <label>Birth Date</label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              placeholder="Your birth date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.birthDate}
              errorMessage={formik.errors.birthDate}
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
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
