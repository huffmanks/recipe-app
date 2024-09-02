import { TagForm } from "@/app/admin/tags/form";

export default async function AdminCreateTagPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create tag</h1>

      <TagForm />
    </>
  );
}
