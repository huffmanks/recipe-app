import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import RegisterForm from "./form";

interface RegisterPageProps {
  searchParams: { familyId?: string };
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  if (!searchParams?.familyId) redirect("/");
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <div className="mx-auto w-[400px]">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Register</h1>
        <p className="mb-4 text-balance text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>
      <RegisterForm familyId={searchParams.familyId} />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
