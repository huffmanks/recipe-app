import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import ForgotPasswordForm from "./form";

export default async function ForgotPasswordPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <>
      <div className="absolute left-8 top-8">
        <Link href="/login">Login</Link>
      </div>
      <div className="mx-auto w-[400px]">
        <div className="mb-4">
          <h1 className="text-center text-3xl font-bold">Forgot password</h1>
        </div>
        <p className="mb-6 text-balance text-center text-muted-foreground">
          Enter your email below to reset your password
        </p>
        <ForgotPasswordForm />
      </div>
    </>
  );
}
