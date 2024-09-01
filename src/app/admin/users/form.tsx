"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { SelectFamily, SelectOrganization, SelectUser } from "@/db/schema";

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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  role: z.enum(["admin", "user"]),
  organizationId: z.string().nullish(),
  familyId: z.string().nullish(),
});

interface UserFormProps {
  userData?: Omit<SelectUser, "image">;
  orgData: SelectOrganization[] | null;
  famData: SelectFamily[] | null;
}

export function UserForm({ userData, orgData, famData }: UserFormProps) {
  const [familyArr, setFamilyArr] = useState<SelectFamily[] | null>(famData);
  const [isLoaded, setIsLoaded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();

  const isUpdateMode = !!userData;
  const isProfilePage = pathname === "/profile";
  const isAdmin = session?.data?.user?.role === "admin" ? true : false;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: userData || {
      firstName: "",
      lastName: "",
      username: "",
      role: "user",
      organizationId: "",
      familyId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newUser = {
      image: `https://placehold.co/600x600/purple/white.png?text=${data.firstName[0].toUpperCase()}`,
      ...data,
    };

    const { role, ...rest } = data;

    const result = isUpdateMode
      ? await updateUser(userData.id, isAdmin ? data : rest)
      : await createUser(newUser);

    if (result) {
      toast.success(
        isProfilePage
          ? "Successfully updated your profile!"
          : isUpdateMode
            ? `Successfully updated user ${result[0].firstName}!`
            : `Successfully created user ${result[0].firstName}!`
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

  const orgSelect = form.watch("organizationId");

  function updateFamilySelect() {
    const filteredFam = famData?.filter((fam) => fam.organizationId === orgSelect);

    if (filteredFam && filteredFam.length > 0) {
      setFamilyArr(filteredFam);
    }
  }

  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);

      if (orgSelect !== "") {
        updateFamilySelect();
      }
      return;
    }

    if (famData && orgSelect !== "") {
      updateFamilySelect();
      form.setValue("familyId", "");
    }
  }, [orgSelect]);

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
                  placeholder="John"
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
                  placeholder="Doe"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="doej"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
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
                    <SelectItem value="user">User</SelectItem>
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
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizations</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {orgData &&
                    orgData.length > 0 &&
                    orgData.map((org) => (
                      <SelectItem
                        key={org.id}
                        value={org.id}>
                        {org.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>You must join an organization.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  {familyArr &&
                    familyArr.length > 0 &&
                    familyArr.map((fam) => (
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
