import type { Metadata } from "next";
import ForgotPasswordForm from "./components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "...",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-secondary-light font-semibold">
            Enter your identifier below to reset your password
          </p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
