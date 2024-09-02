import { OrganizationForm } from "@/app/admin/organizations/form";

export default async function AdminCreateOrganizationPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create organization</h1>

      <OrganizationForm />
    </>
  );
}
