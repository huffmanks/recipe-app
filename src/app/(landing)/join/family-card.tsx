import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  image: string | null;
}

interface FamilyWithMembers {
  id: string;
  title: string;
  image: string | null;
  users: Member[];
}

interface FamilyCardProps {
  family: FamilyWithMembers;
}

export default function FamilyCard({ family }: FamilyCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center space-x-4 pb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={family.image ?? undefined}
            alt={family.title}
          />
          <AvatarFallback>{family.title[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{family.title}</h2>
      </CardHeader>
      <CardContent>
        <div className="flex">
          {family.users.map((member, index) => (
            <MemberAvatar
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          asChild>
          <Link href={`/register?familyId=${family.id}`}>Join</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function MemberAvatar({ member, index }: { member: Member; index: number }) {
  const fullName = `${member.firstName} ${member.lastName}`;
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Avatar className={`h-12 w-12 border-2 border-background ${index !== 0 ? "-ml-4" : ""}`}>
      <AvatarImage
        src={member.image ?? undefined}
        alt={fullName}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
