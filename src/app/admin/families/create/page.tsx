import FamilyForm from "@/app/admin/families/form";

export default async function AdminCreateFamilyPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create family</h1>

      <FamilyForm />
    </>
  );
}
