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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUser } from "../actions";

const FormSchema = z.object({
  role: z.enum(["admin", "member", "guest"]),
});

interface UserFormProps {
  isAdmin: boolean;
  userId: string;
  userRole: "admin" | "member" | "guest";
}

export default function RoleForm({ isAdmin, userId, userRole }: UserFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: userRole,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await updateUser(userId, data);

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
            <CardTitle>Role</CardTitle>
            <CardDescription>Assign the user&rsquo;s access level (admin only).</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <Select
                    disabled={!isAdmin}
                    onValueChange={field.onChange}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="border-t px-6 py-4">
            <Button
              type="submit"
              disabled={!isAdmin}>
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
