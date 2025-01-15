import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./components/login-form";
import LoginViaMicrosoft from "./components/login-via-microsoft";

export const metadata: Metadata = {
  title: "Login",
  description: "...",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-primary-light font-semibold">
            Welcome Back
          </h1>
          <p className="text-text font-semibold">
            Enter your email and password to sign in
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <LoginForm />
          <p className="text-center text-text">Or</p>
          <LoginViaMicrosoft />
        </div>

        <div className="flex gap-1">
          <p className="text-text">Don&apos;t have an account?</p>
          <Link className="text-primary-light font-semibold" href="/sign-up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
