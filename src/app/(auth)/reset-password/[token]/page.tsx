import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import GoBackButton from "@/components/custom/go-back-button";

import ResetPasswordForm from "./form";

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <div className="mx-auto w-[400px]">
      <div className="relative mb-4">
        <GoBackButton href="/login" />
        <h1 className="text-center text-3xl font-bold">Reset password</h1>
      </div>
      <p className="mb-6 text-balance text-center text-muted-foreground">Enter your new password</p>
      <ResetPasswordForm token={params.token} />
    </div>
  );
}
