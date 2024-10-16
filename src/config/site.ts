export const DATABASE_PREFIX = "recipe";
export const SITE_TITLE = "Recipe Vault";
export const SITE_TITLE_TEMPLATE = "%s - Recipe Vault";
export const SITE_DESCRIPTION = "Store and manage your recipes with ease.";

export interface SiteLink {
  label: string;
  href: string;
}

export const siteLinks: SiteLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Recipes",
    href: "/dashboard/recipes",
  },
  {
    label: "Schedule",
    href: "/dashboard/schedule",
  },
  {
    label: "Favorites",
    href: "/dashboard/favorites",
  },
];

export const adminLinks: SiteLink[] = [
  {
    label: "Admin",
    href: "/admin",
  },
  {
    label: "Families",
    href: "/admin/families",
  },
  {
    label: "Users",
    href: "/admin/users",
  },
];

export const landingLinks: SiteLink[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Join",
    href: "/join",
  },
];

export const profileLinks: SiteLink[] = [
  {
    label: "General",
    href: "/dashboard/profile",
  },
  {
    label: "Account",
    href: "/dashboard/profile/account",
  },
  {
    label: "Family",
    href: "/dashboard/profile/family",
  },
  {
    label: "Settings",
    href: "/dashboard/profile/settings",
  },
];
