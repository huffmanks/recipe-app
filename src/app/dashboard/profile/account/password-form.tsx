"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updatePassword } from "../actions";

const FormSchema = z.object({
  password: z.string().min(8, "Password is too short. Minimum 8 characters required.").max(64),
});

interface UserFormProps {
  userId: string;
}

export default function PasswordForm({ userId }: UserFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "qwerty123456!@#$",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updatePassword(userId, data);

    if (result?.success) {
      toast.success("Successfully updated your account!");
    } else {
      toast.error("Updating your account failed!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password."
                      onFocus={() => (field.value = "")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Update</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
