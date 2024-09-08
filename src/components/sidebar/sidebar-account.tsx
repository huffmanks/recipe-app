import { LogOutIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

import { handleLogout } from "@/auth/actions";
import SidebarButton from "@/components/sidebar/sidebar-button";

interface SidebarAccountProps {
  className: string;
}

export default function SidebarAccount({ className }: SidebarAccountProps) {
  return (
    <div className={className}>
      <Link href="/dashboard/profile">
        <SidebarButton
          className="w-full"
          size="sm"
          icon={SettingsIcon}>
          Profile
        </SidebarButton>
      </Link>
      <form action={handleLogout}>
        <SidebarButton
          className="w-full"
          type="submit"
          size="sm"
          icon={LogOutIcon}>
          Sign out
        </SidebarButton>
      </form>
    </div>
  );
}
