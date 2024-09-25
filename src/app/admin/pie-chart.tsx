"use client";

import { useMemo } from "react";

import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  users: {
    label: "Users",
  },
  admin: {
    label: "Admin",
    color: "hsl(var(--chart-1))",
  },
  member: {
    label: "Member",
    color: "hsl(var(--chart-3))",
  },
  guest: {
    label: "Guest",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface UserPieChartProps {
  adminCount: number;
  memberCount: number;
  guestCount: number;
}

export function UserPieChart({ adminCount, memberCount, guestCount }: UserPieChartProps) {
  const chartData = useMemo(
    () => [
      { role: "admin", users: adminCount, fill: "var(--color-admin)" },
      { role: "member", users: memberCount, fill: "var(--color-member)" },
      { role: "guest", users: guestCount, fill: "var(--color-guest)" },
    ],
    [adminCount, memberCount, guestCount]
  );

  const totalUsers = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users</CardTitle>
        <CardDescription>by role</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="users"
              nameKey="role"
              innerRadius={60}
              strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle">
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold">
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground">
                          Total users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
