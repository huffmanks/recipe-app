"use client";

import { MoreHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SidebarAvatar() {
  const session = useSession();

  if (!session.data?.user) return null;

  const userInitial = session.data.user.email
    ? session.data.user.email.substring(0, 1).toUpperCase()
    : "A";
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={session.data.user.image!} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <span>{session.data.user.email}</span>
      </div>
      <MoreHorizontalIcon size={20} />
    </div>
  );
}
