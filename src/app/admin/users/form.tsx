"use client";

import { usePathname, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SelectFamily, SelectUser } from "@/db/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createUser, updateUser } from "./actions";

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
  role: z.enum(["admin", "member", "guest"]),
  familyId: z.string().min(1, {
    message: "A family must be selected.",
  }),
});

interface UserFormProps {
  isAdmin: boolean;
  userData?: SelectUser;
  famData: SelectFamily[] | null;
}

export default function UserForm({ isAdmin, userData, famData }: UserFormProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isUpdateMode = !!userData;
  const isProfilePage = pathname === "/dashboard/profile";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: userData || {
      firstName: "",
      lastName: "",
      email: "",
      role: "member",
      familyId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { role, ...rest } = data;

    const result = isUpdateMode
      ? await updateUser(userData.id, isAdmin ? data : rest)
      : await createUser(data);

    if (result?.success) {
      toast.success(
        isProfilePage
          ? "Successfully updated your profile!"
          : isUpdateMode
            ? `Successfully updated user ${result.success[0].firstName}!`
            : `Successfully created user ${result.success[0].firstName}!`
      );

      if (!isProfilePage) {
        router.push("/admin/users");
      }
    } else {
      toast.error(
        isProfilePage
          ? "Updating your profile failed!"
          : isUpdateMode
            ? "Updating user failed!"
            : "Creating user failed!"
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
            <FormItem>
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

        {isAdmin && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
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
                <FormDescription>You must select a role.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="familyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Families</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a family" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {famData &&
                    famData.length > 0 &&
                    famData.map((fam) => (
                      <SelectItem
                        key={fam.id}
                        value={fam.id}>
                        {fam.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>You must join a family.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isUpdateMode ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
