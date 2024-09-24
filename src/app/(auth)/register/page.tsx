import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";

import RegisterForm from "./form";

export default async function RegisterPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <>
      <RegisterForm />
    </>
  );
}
