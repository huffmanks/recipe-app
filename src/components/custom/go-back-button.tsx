import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GoBackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="absolute left-0 top-0">
      <Button
        className="rounded-full"
        size="icon"
        variant="outline">
        <ArrowLeftIcon />
      </Button>
    </Link>
  );
}
