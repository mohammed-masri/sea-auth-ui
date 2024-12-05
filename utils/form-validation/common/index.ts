import { StringUtils } from "sea-react-components";
import * as Yup from "yup";

const name = Yup.string().min(3).max(50).required("Required");
const birthDate = Yup.string().required("Required");
const email = Yup.string().email().required("Required");
const phoneNumber = Yup.string()
  .matches(StringUtils.phoneRegExp, "Phone number is not valid")
  .required("Required");
const password = Yup.string().min(8).required("Required");
const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password"), undefined], "Passwords must match")
  .required("Confirm password is required");

const identifier = Yup.string()
  .required("Identifier is required")
  .test(
    "is-email-or-phone",
    "Identifier must be a valid email or phone number",
    (value) =>
      !!value &&
      (StringUtils.emailRegex.test(value) ||
        StringUtils.phoneRegExp.test(value)) // Simple email and phone regex
  );

const otpCode = (length: number) =>
  Yup.string()
    .length(length, `OTP length must be ${length}`)
    .required("Required");

const CommonValidations = {
  name,
  email,
  phoneNumber,
  password,
  confirmPassword,
  identifier,
  otpCode,
  birthDate,
};
export default CommonValidations;
