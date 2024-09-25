"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

import { SelectOrganization } from "@/db/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createOrganization, updateOrganization } from "./actions";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
});

interface OrganizationFormProps {
  organizationData?: SelectOrganization;
}

export function OrganizationForm({ organizationData }: OrganizationFormProps) {
  const router = useRouter();

  const isUpdateMode = !!organizationData;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: organizationData || {
      title: "",
      slug: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = isUpdateMode
      ? await updateOrganization(organizationData.id, data)
      : await createOrganization(data);

    if (result) {
      toast.success(
        isUpdateMode
          ? `Successfully updated organization ${result[0].title}!`
          : `Successfully created organization ${result[0].title}!`
      );

      router.push("/admin/organizations");
    } else {
      toast.error(isUpdateMode ? "Updating organization failed!" : "Creating organization failed!");
    }
  }

  const titleInput = form.watch("title");

  useEffect(() => {
    if (titleInput !== "") {
      const slug = slugify(titleInput, { lower: true });
      form.setValue("slug", slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleInput]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Aurelia"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="aurelia"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{isUpdateMode ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
