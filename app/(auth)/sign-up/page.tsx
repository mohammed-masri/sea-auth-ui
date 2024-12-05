import type { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./components/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "...",
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-primary-light font-semibold">Welcome</h1>
          <p className="text-secondary-light font-semibold">
            Enter your sign up information below
          </p>
        </div>

        <SignUpForm />

        <div className="flex gap-1">
          <p className="text-secondary-light">Already have an account?</p>
          <Link className="text-primary-light font-semibold" href="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
