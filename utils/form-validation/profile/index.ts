/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { ValidationUtils } from "sea-react-components";

export const updateProfileFormValidation = () => {
  return Yup.object({
    name: ValidationUtils.name as any,
    birthDate: ValidationUtils.birthDate as any,
  });
};
