"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { getRecipeFromUrl } from "@/puppeteer";
import { createRecipe } from "./actions";

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
import { Label } from "@/components/ui/label";

const FormSchema = z.object({
  urls: z
    .array(
      z.object({
        text: z.string().url({ message: "Must be a valid URL." }),
      })
    )
    .min(1, {
      message: "Must have a least one URL.",
    }),
});

export function RecipeFormUrl() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      urls: [{ text: "" }],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    for (const url of data.urls) {
      const recipe = await getRecipeFromUrl(url.text);
      // add userId
      const result = await createRecipe(recipe);

      if (result) {
        toast.success(`Successfully created recipe ${result[0].title}!`);

        router.push("/admin/recipes");
      } else {
        toast.error("Creating recipe failed!");
      }
    }
  }

  const { fields, append, remove } = useFieldArray({ name: "urls", control: form.control });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6">
        <div className="space-y-3">
          <Label className="text-lg">URLs</Label>
          {fields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`urls.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL {index + 1}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-6"
                        placeholder="https://recipes.com/taco"
                        {...field}
                      />

                      <Button
                        className={cn(
                          "group absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent focus:bg-transparent",
                          fields.length === 1 && "invisible"
                        )}
                        variant="ghost"
                        size="icon"
                        type="button"
                        disabled={fields.length === 1}
                        onClick={() => remove(index)}>
                        <Trash2Icon className="size-4 group-hover:text-destructive group-focus:text-destructive" />
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            className="flex items-center justify-center gap-2"
            variant="secondary"
            type="button"
            onClick={() => append({ text: "" })}>
            <PlusIcon className="size-4" /> <span>Add URL</span>
          </Button>
        </div>

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
