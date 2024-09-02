import { CategoryForm } from "@/app/admin/categories/form";

export default async function AdminCreateCategoryPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create category</h1>

      <CategoryForm />
    </>
  );
}
