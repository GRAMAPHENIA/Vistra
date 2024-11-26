"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
import { useEffect, useState } from "react"

type DashboardData = {
  date: string
  gastosDiarios: number
  totalesMensuales: number
  reservas: number
  horasFreelancer: number
  margenInesperado: number
}

const chartConfig = {
  gastosDiarios: {
    label: "Gastos Diarios",
    color: "hsl(var(--chart-1))",
  },
  totalesMensuales: {
    label: "Totales Mensuales",
    color: "hsl(var(--chart-2))",
  },
  reservas: {
    label: "Reservas",
    color: "hsl(var(--chart-3))",
  },
  horasFreelancer: {
    label: "Horas Freelancer",
    color: "hsl(var(--chart-4))",
  },
  margenInesperado: {
    label: "Margen Inesperado",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function DashboardOverview() {
  const [chartData, setChartData] = useState<DashboardData[]>([])

  useEffect(() => {
    const generateSampleData = (): DashboardData[] => {
      const startDate = new Date('2024-01-01')
      const data: DashboardData[] = []

      for (let i = 0; i < 90; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)

        data.push({
          date: currentDate.toISOString().split('T')[0],
          gastosDiarios: Math.floor(Math.random() * 500),
          totalesMensuales: Math.floor(Math.random() * 10000),
          reservas: Math.floor(Math.random() * 2000),
          horasFreelancer: Math.floor(Math.random() * 12),
          margenInesperado: Math.floor(Math.random() * 1000),
        })
      }

      return data
    }

    setChartData(generateSampleData())
  }, [])

  const total = React.useMemo(
    () => ({
      gastosDiarios: chartData.reduce((acc, curr) => acc + curr.gastosDiarios, 0),
      totalesMensuales: chartData.reduce((acc, curr) => acc + curr.totalesMensuales, 0),
      reservas: chartData.reduce((acc, curr) => acc + curr.reservas, 0),
      horasFreelancer: chartData.reduce((acc, curr) => acc + curr.horasFreelancer, 0),
      margenInesperado: chartData.reduce((acc, curr) => acc + curr.margenInesperado, 0),
    }),
    [chartData]
  )

  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("gastosDiarios")

  if (!chartData.length) return null

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Resumen General</CardTitle>
          <CardDescription>
            Mostrando datos de los últimos 3 meses
          </CardDescription>
        </div>
        <div className="flex flex-wrap">
          {Object.keys(chartConfig).map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-6 sm:py-4"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-sm font-bold leading-none sm:text-lg">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("es-ES", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
