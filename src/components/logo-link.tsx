import Link from "next/link";

import { Icons } from "@/components/icons/logo";

export default function LogoLink() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3">
      <Icons.logo className="size-8" />
      <div className="font-light leading-none tracking-widest">Recipe Vault</div>
    </Link>
  );
}
