import { format } from "date-fns";

export function formatWeekHeading(startDay: Date, endDay: Date) {
  const sameYear = startDay.getFullYear() === endDay.getFullYear();
  const sameMonth = startDay.getMonth() === endDay.getMonth();

  if (sameYear && sameMonth) {
    return `${format(startDay, "MMM. d")}-${format(endDay, "d")}, ${format(startDay, "yyyy")}`;
  }

  if (sameYear) {
    return `${format(startDay, "MMM. d")}-${format(endDay, "MMM. d")}, ${format(startDay, "yyyy")}`;
  }

  return `${format(startDay, "MMM. d, yyyy")}-${format(endDay, "MMM. d, yyyy")}`;
}
