export const DATABASE_PREFIX = "recipe";
export const SITE_TITLE = "Recipe Vault";
export const SITE_TITLE_TEMPLATE = "%s - Recipe Vault";
export const SITE_DESCRIPTION = "Store and manage your recipes with ease.";

export interface SiteLink {
  label: string;
  href: string;
}

export const siteLinks = [
  {
    label: "Home",
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
  {
    label: "Profile",
    href: "/dashboard/profile",
  },
];

export const adminLinks = [
  {
    label: "Categories",
    href: "/admin/categories",
  },
  {
    label: "Cuisines",
    href: "/admin/cuisines",
  },
  {
    label: "Families",
    href: "/admin/families",
  },
  {
    label: "Organizations",
    href: "/admin/organizations",
  },
  {
    label: "Tags",
    href: "/admin/tags",
  },
  {
    label: "Users",
    href: "/admin/users",
  },
];
