interface ScheduleCreateSearchParams {
  date: string;
  meal: string;
}

interface ScheduleCreatePageProps {
  searchParams: ScheduleCreateSearchParams;
}

export default function ScheduleCreatePage({ searchParams }: ScheduleCreatePageProps) {
  return (
    <div>
      <div>{searchParams.date}</div>
      <div>{searchParams.meal}</div>
    </div>
  );
}
