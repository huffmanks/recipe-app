import db from "@/db";

import FamilyCard from "./family-card";

export default async function JoinPage() {
  const families = await db.query.families.findMany({
    columns: {
      id: true,
      title: true,
      image: true,
    },
    with: {
      users: {
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          image: true,
        },
      },
    },
  });

  return (
    <>
      <h1 className="mb-8 text-center text-3xl font-bold">Join a family</h1>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-8">
        {families.map((family) => (
          <FamilyCard
            key={family.id}
            family={family}
          />
        ))}
      </div>
    </>
  );
}
