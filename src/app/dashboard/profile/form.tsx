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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateUser } from "./actions";

const FormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email must be at least 2 characters.",
  }),
});

interface UserFormProps {
  userData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function ProfileForm({ userData }: UserFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updateUser(userData.id, data);

    if (result?.success) {
      toast.success("Successfully updated your profile!");
    } else {
      toast.error("Updating your profile failed!");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-background">
          <CardHeader>
            <CardTitle>Edit personal info</CardTitle>
            <CardDescription>
              Keep your information up to date for a personalized experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mira"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Artemis"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="artemism@example.com"
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
