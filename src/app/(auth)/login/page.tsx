import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import LoginForm from "./form";

export default async function LoginPage() {
  const { user } = await auth();

  if (user) redirect("/dashboard");
  return (
    <>
      <LoginForm />
    </>
  );
}
