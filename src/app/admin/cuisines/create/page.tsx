import { CuisineForm } from "@/app/admin/cuisines/form";

export default async function AdminCreateCuisinePage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create cuisine</h1>

      <CuisineForm />
    </>
  );
}
