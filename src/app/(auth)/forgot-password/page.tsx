import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import ForgotPasswordForm from "./form";

export default async function ForgotPasswordPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <>
      <ForgotPasswordForm />
    </>
  );
}
