import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import GoBackButton from "@/components/custom/go-back-button";

import ForgotPasswordForm from "./form";

export default async function ForgotPasswordPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <div className="mx-auto w-[400px]">
      <div className="relative mb-4">
        <GoBackButton href="/login" />
        <h1 className="text-center text-3xl font-bold">Forgot password</h1>
      </div>
      <p className="mb-6 text-balance text-center text-muted-foreground">
        Enter your email below to reset your password
      </p>
      <ForgotPasswordForm />
      <div className="text-center text-sm">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
