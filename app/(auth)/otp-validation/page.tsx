import type { Metadata } from "next";
import OtpValidationForm from "./components/otp-validation-form";
import Title from "./components/title";

export const metadata: Metadata = {
  title: "OTP validation",
  description: "...",
};

export default function OtpValidationPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-10">
        <Title />
        <OtpValidationForm />
      </div>
    </div>
  );
}
