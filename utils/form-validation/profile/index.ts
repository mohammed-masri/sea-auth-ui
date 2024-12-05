import * as Yup from "yup";
import CommonValidations from "../common";

export const updateProfileFormValidation = () => {
  return Yup.object({
    name: CommonValidations.name,
    birthDate: CommonValidations.birthDate,
  });
};
