"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  search: z.string(),
});

interface SearchFormProps {
  searchTerm?: string;
}

export function SearchForm({ searchTerm }: SearchFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      search: searchTerm ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    params.set("q", data.search);
    if (data.search === "") {
      params.delete("q");
    }
    router.push(`/dashboard/recipes?${params}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mb-8 w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Search for recipes..."
                    {...field}
                  />
                  <Button
                    asChild
                    type="submit"
                    variant="ghost"
                    size="unset"
                    className="absolute right-4 top-1/2 -translate-y-1/2">
                    <SearchIcon className="size-5 text-muted-foreground" />
                  </Button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
