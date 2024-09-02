"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

import { SelectCuisine } from "@/db/schema";

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
import { createCuisine, updateCuisine } from "./actions";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
});

interface CuisineFormProps {
  cuisineData?: SelectCuisine;
}

export function CuisineForm({ cuisineData }: CuisineFormProps) {
  const router = useRouter();

  const isUpdateMode = !!cuisineData;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: cuisineData || {
      title: "",
      slug: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = isUpdateMode
      ? await updateCuisine(cuisineData.id, data)
      : await createCuisine(data);

    if (result) {
      toast.success(
        isUpdateMode
          ? `Successfully updated cuisine ${result[0].title}!`
          : `Successfully created cuisine ${result[0].title}!`
      );

      router.push("/admin/cuisines");
    } else {
      toast.error(isUpdateMode ? "Updating cuisine failed!" : "Creating cuisine failed!");
    }
  }

  const titleInput = form.watch("title");

  useEffect(() => {
    if (titleInput !== "") {
      const slug = slugify(titleInput, { lower: true });
      form.setValue("slug", slug);
    }
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
                  placeholder="American"
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
                  placeholder="american"
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
