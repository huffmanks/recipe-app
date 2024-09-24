import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function GoBackButton({ href }: { href: string }) {
  return (
    <div className="relative">
      <Link href={href}>
        <Button
          className="absolute left-4 top-5 rounded-full"
          size="icon"
          variant="outline">
          <ArrowLeftIcon />
        </Button>
      </Link>
    </div>
  );
}
