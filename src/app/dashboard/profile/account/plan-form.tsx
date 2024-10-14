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
  plan: z.enum(["free", "premium", "custom"]),
});

interface UserFormProps {
  userId: string;
  userPlan: "free" | "premium" | "custom";
}

export default function PlanForm({ userId, userPlan }: UserFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      plan: userPlan,
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
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Change your subscription plan.</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="w-2/3">
                  <Select
                    disabled
                    onValueChange={field.onChange}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
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
              disabled>
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
