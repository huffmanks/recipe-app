import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import ResetPasswordForm from "./form";

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <>
      <ResetPasswordForm token={params.token} />
    </>
  );
}
