import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import LoginForm from "./form";

export default async function LoginPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <div className="mx-auto w-[400px]">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Login</h1>
        <p className="mb-4 text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/join"
          className="underline">
          Join
        </Link>
      </div>
    </div>
  );
}
