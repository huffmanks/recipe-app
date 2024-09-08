"use client";

import { User } from "lucia";
import { useMediaQuery } from "usehooks-ts";

import SidebarDesktop from "@/components/sidebar/sidebar-desktop";
import SidebarMobile from "@/components/sidebar/sidebar-mobile";

interface SidebarProps {
  isAdmin: boolean;
  user: User;
}

export default function Sidebar({ user, isAdmin }: SidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return (
      <SidebarDesktop
        user={user}
        isAdmin={isAdmin}
      />
    );
  }

  return (
    <SidebarMobile
      user={user}
      isAdmin={isAdmin}
    />
  );
}
