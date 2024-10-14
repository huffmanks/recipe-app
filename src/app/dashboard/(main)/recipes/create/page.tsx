import { auth } from "@/auth/validate-request";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RecipeFormManual from "../form-manual";
import RecipeFormUrl from "../form-url";

export default async function RecipeCreatePage() {
  const { user } = await auth();

  if (!user) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create recipe</h1>

      <Tabs defaultValue="url">
        <TabsList>
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>
        <TabsContent value="url">
          <RecipeFormUrl userId={user.id} />
        </TabsContent>
        <TabsContent value="manual">
          <RecipeFormManual userId={user.id} />
        </TabsContent>
      </Tabs>
    </>
  );
}
