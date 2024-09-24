"use client";

import { User } from "lucia";
import { MoreHorizontalIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarAvatarProps {
  user: User;
}

export default function SidebarAvatar({ user }: SidebarAvatarProps) {
  const userInitial = user.name.substring(0, 1).toUpperCase();
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={user?.image!} />
          <AvatarFallback className="bg-primary">{userInitial}</AvatarFallback>
        </Avatar>
        <span>{user.name}</span>
      </div>
      <MoreHorizontalIcon size={20} />
    </div>
  );
}
