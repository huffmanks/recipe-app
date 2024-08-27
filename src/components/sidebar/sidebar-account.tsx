import { LogOutIcon, SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import SidebarButton from "@/components/sidebar/sidebar-button";

interface SidebarAccountProps {
  className: string;
}

export default function SidebarAccount({ className }: SidebarAccountProps) {
  return (
    <div className={className}>
      <Link href="/profile">
        <SidebarButton
          className="w-full"
          size="sm"
          icon={SettingsIcon}>
          Profile
        </SidebarButton>
      </Link>
      <SidebarButton
        className="w-full"
        size="sm"
        icon={LogOutIcon}
        onClick={() => signOut()}>
        Sign out
      </SidebarButton>
    </div>
  );
}
