import type { Metadata } from "next";
import ResetPasswordForm from "./components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "...",
};

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-secondary-light font-semibold">
            Enter your new password
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}
