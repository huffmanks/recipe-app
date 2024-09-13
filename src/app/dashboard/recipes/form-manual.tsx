"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { z } from "zod";

import { SelectRecipe } from "@/db/schema";
import { cn } from "@/lib/utils";
import { createRecipe, updateRecipe } from "./actions";

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
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description be at least 10 characters.",
  }),
  image: z.string().min(5, {
    message: "Image be at least 5 characters.",
  }),
  prepTime: z.string().optional(),
  cookTime: z.string().optional(),
  totalTime: z.string().optional(),
  servingSize: z.preprocess((val) => {
    if (typeof val === "string") {
      const parsed = parseFloat(val);
      return isNaN(parsed) ? undefined : parsed;
    }
    return val;
  }, z.number()),
  categories: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split(",").map((item) => item.trim());
    }
    return val;
  }, z.array(z.string())),
  cuisines: z.preprocess((val) => {
    if (typeof val === "string") {
      return val.split(",").map((item) => item.trim());
    }
    return val;
  }, z.array(z.string())),
  tags: z
    .preprocess((val) => {
      if (typeof val === "string") {
        return val.split(",").map((item) => item.trim());
      }
      return val;
    }, z.array(z.string()))
    .optional(),
  ingredients: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Must have at least 1 character." }),
      })
    )
    .min(1, {
      message: "Must have a least one ingredient.",
    }),
  instructions: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Must have at least 1 character." }),
      })
    )
    .min(1, {
      message: "Must have a least one instruction.",
    }),
});

interface RecipeFormProps {
  recipeData?: SelectRecipe;
}

export function RecipeFormManual({ recipeData }: RecipeFormProps) {
  const router = useRouter();

  const isUpdateMode = !!recipeData;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: recipeData || {
      title: "",
      slug: "",
      description: "",
      image: "",
      prepTime: "",
      cookTime: "",
      totalTime: "",
      servingSize: "",
      categories: "",
      cuisines: "",
      tags: "",
      ingredients: [{ text: "" }],
      instructions: [{ text: "" }],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const newData = {userId, ...data}
    const result = isUpdateMode
      ? await updateRecipe(recipeData.id, data)
      : await createRecipe(data);

    if (result) {
      toast.success(
        isUpdateMode
          ? `Successfully updated recipe ${result[0].title}!`
          : `Successfully created recipe ${result[0].title}!`
      );

      router.push("/admin/recipes");
    } else {
      toast.error(isUpdateMode ? "Updating recipe failed!" : "Creating recipe failed!");
    }
  }

  const titleInput = form.watch("title");

  useEffect(() => {
    if (titleInput !== "") {
      const slug = slugify(titleInput, { lower: true });
      form.setValue("slug", slug);
    }
  }, [titleInput]);

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({ name: "ingredients", control: form.control });
  const {
    fields: instructionFields,
    append: instructionAppend,
    remove: instructionRemove,
  } = useFieldArray({ name: "instructions", control: form.control });

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
                  placeholder="Spaghetti with meatballs"
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
                  placeholder="spaghetti-with-meatballs"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a description for the recipe."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://recipes.com/tacos"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prepTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prep time</FormLabel>
              <FormControl>
                <Input
                  placeholder="PT15M"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cookTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cook time</FormLabel>
              <FormControl>
                <Input
                  placeholder="PT15M"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total time</FormLabel>
              <FormControl>
                <Input
                  placeholder="PT15M"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="servingSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serving size</FormLabel>
              <FormControl>
                <Input
                  placeholder="4"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Input
                  placeholder="Breakfast,Brunch"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cuisines"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisines</FormLabel>
              <FormControl>
                <Input
                  placeholder="American,Chinese"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Beef,Pasta"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <Label className="text-lg">Ingredients</Label>
          {ingredientFields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`ingredients.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredient {index + 1}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="pr-6"
                        placeholder="1 lb. ground beef"
                        {...field}
                      />

                      <Button
                        className={cn(
                          "group absolute right-0 top-1/2 -translate-y-1/2 hover:bg-transparent focus:bg-transparent",
                          ingredientFields.length === 1 && "invisible"
                        )}
                        variant="ghost"
                        size="icon"
                        type="button"
                        disabled={ingredientFields.length === 1}
                        onClick={() => ingredientRemove(index)}>
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
            onClick={() => ingredientAppend({ text: "" })}>
            <PlusIcon className="size-4" /> <span>Add ingredient</span>
          </Button>
        </div>

        <div className="space-y-3">
          <Label className="text-lg">Instructions</Label>
          {instructionFields.map((item, index) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`instructions.${index}.text`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instruction {index + 1}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Cook the ground beef."
                        className="resize-none pr-6"
                        {...field}
                      />

                      <Button
                        className={cn(
                          "group absolute right-0 top-0 hover:bg-transparent focus:bg-transparent",
                          instructionFields.length === 1 && "invisible"
                        )}
                        variant="ghost"
                        size="icon"
                        type="button"
                        disabled={instructionFields.length === 1}
                        onClick={() => instructionRemove(index)}>
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
            onClick={() => instructionAppend({ text: "" })}>
            <PlusIcon className="size-4" /> <span>Add instruction</span>
          </Button>
        </div>

        <Button type="submit">{isUpdateMode ? "Update" : "Create"}</Button>
      </form>
    </Form>
  );
}
