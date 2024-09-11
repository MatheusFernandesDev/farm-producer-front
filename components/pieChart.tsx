"use client"

import { LabelList, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const generateColor = (index: number) => {
  const hue = (index * 137.508) % 360; 
  return `hsl(${hue}, 70%, 60%)`;
}


interface PieTypes {
  title: string
  description?: string
  data: Array<{ state: string; count: string }> 
}

export function PieChartComponent({ title, description, data }: PieTypes) {
  if(!data) return

  const chartData = data?.map((item, index) => ({
    state: item.state,
    count: Number(item.count), 
    fill: generateColor(index), 
  }))

  const chartConfig: ChartConfig = chartData.reduce((config, item, index) => {
    config[item.state] = {
      label: item.state,
      color: item.fill,
    }
    return config
  }, {} as ChartConfig)

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="state" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="state">
              <LabelList
                dataKey="state"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
