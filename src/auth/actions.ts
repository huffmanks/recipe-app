"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";
import { Scrypt, generateId } from "lucia";
import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { v4 as uuidv4 } from "uuid";

import { lucia } from "@/auth";
import {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/auth/schema";
import { auth } from "@/auth/validate-request";
import { db } from "@/db";
import { passwordResetTokens, users } from "@/db/schema";

export interface ActionResponse<_T> {
  error: string;
}

export async function handleLogin(values: LoginInput): Promise<ActionResponse<LoginInput>> {
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    const err = parsed.error.flatten();

    const message =
      err.fieldErrors.email?.[0] || err.fieldErrors.password?.[0] || "Invalid login input.";

    return {
      error: message,
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      error: "Incorrect email or password.",
    };
  }

  const validPassword = await new Scrypt().verify(existingUser.hashedPassword, password);
  if (!validPassword) {
    return {
      error: "Incorrect email or password.",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/dashboard");
}

export async function handleRegister(
  values: RegisterInput
): Promise<ActionResponse<RegisterInput>> {
  const parsed = registerSchema.safeParse(values);

  if (!parsed.success) {
    const err = parsed.error.flatten();

    const message =
      err.fieldErrors.email?.[0] || err.fieldErrors.password?.[0] || "Invalid login input.";

    return {
      error: message,
    };
  }

  const { email, password } = parsed.data;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  });

  if (existingUser) {
    return {
      error: "Cannot create account with that email.",
    };
  }

  const hashedPassword = await new Scrypt().hash(password);
  const newUserId = uuidv4();

  await db.insert(users).values({
    id: newUserId,
    firstName: values.firstName,
    lastName: values.lastName,
    email,
    hashedPassword,
  });

  const session = await lucia.createSession(newUserId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/dashboard");
}

export async function handleLogout(): Promise<{ error: string } | void> {
  const { session } = await auth();

  if (!session) {
    return {
      error: "No session found",
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}

export async function handleForgotPassword(
  values: ForgotPasswordInput
): Promise<{ error?: string; token?: string }> {
  const parsed = forgotPasswordSchema.safeParse(values);

  if (!parsed.success) {
    return { error: "Provided email is invalid." };
  }

  try {
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, parsed.data.email),
    });

    if (!user) return { error: "Provided email is invalid." };

    const token = await generatePasswordResetToken(user.id);

    return { token };
  } catch (_error) {
    return { error: "Failed to send verification email." };
  }
}

export async function handleResetPassword(values: ResetPasswordInput): Promise<{ error?: string }> {
  const parsed = resetPasswordSchema.safeParse(values);

  if (!parsed.success) {
    const err = parsed.error.flatten();
    return {
      error: err.fieldErrors.password?.[0] ?? err.fieldErrors.token?.[0],
    };
  }
  const { token, password } = parsed.data;

  const dbToken = await db.transaction(async (tx) => {
    const item = await tx.query.passwordResetTokens.findFirst({
      where: (table, { eq }) => eq(table.id, token),
    });
    if (item) {
      await tx.delete(passwordResetTokens).where(eq(passwordResetTokens.id, item.id));
    }
    return item;
  });

  if (!dbToken) return { error: "Invalid password reset link." };

  if (!isWithinExpirationDate(dbToken.expiresAt)) return { error: "Password reset link expired." };

  await lucia.invalidateUserSessions(dbToken.userId);

  const hashedPassword = await new Scrypt().hash(password);
  await db.update(users).set({ hashedPassword }).where(eq(users.id, dbToken.userId));

  const session = await lucia.createSession(dbToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  redirect("/dashboard");
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));

  const tokenId = generateId(40);

  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });

  return tokenId;
}
