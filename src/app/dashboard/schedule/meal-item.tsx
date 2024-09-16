import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduleItem } from "@/providers/scheduler";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface MealItemProps {
  item: ScheduleItem;
}

export default function MealItem({ item }: MealItemProps) {
  return (
    <div>
      <Badge
        variant="secondary"
        className="mb-3 uppercase tracking-widest">
        {item.meal}
      </Badge>
      <div className="flex items-center gap-4">
        {item?.image ? (
          <>
            <img
              className="size-12 rounded-lg object-cover"
              src={item.image}
              alt={item.title}
            />
            <div>{item.title}</div>
          </>
        ) : (
          <Button
            className="rounded-full border-dashed p-2"
            size="unset"
            variant="outline"
            asChild>
            <Link
              href={`/dashboard/schedule/create?date=${item.dateTime.toLocaleDateString()}&meal=${item.meal}`}>
              <PlusIcon className="size-5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
