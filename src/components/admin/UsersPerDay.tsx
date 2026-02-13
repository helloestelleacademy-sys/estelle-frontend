"use client"
import React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const UsersPerDay = ({ data }: { data: { _id: string; count: number }[] }) => {
  // Transform data for chart
  const chartData = data.map(item => ({
    date: item._id,
    users: item.count
  }));

  const chartConfig = {
    users: {
      label: "Users",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

  return (
    <div>
      <h1 className='text-lg font-medium mb-6'>User Growth (Last 30 Days)</h1>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(5)} // Show MM-DD
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-users)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-users)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="users"
            type="monotone"
            fill="url(#fillUsers)"
            fillOpacity={0.4}
            stroke="var(--color-users)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}

export default UsersPerDay
