"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { handleLogin } from "@/auth/actions";
import { loginSchema } from "@/auth/schema";

import LoadingButton from "@/components/custom/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@example.com",
      password: "password",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const result = await handleLogin(values);

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (_error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="mb-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="lysanderartemis@example.com"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between gap-4">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            pending={form.formState.isSubmitting}
            text="Login"
          />
        </form>
      </Form>
    </div>
  );
}
