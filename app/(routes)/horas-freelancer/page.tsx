"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"

type HorasFreelancer = {
  id: number
  fecha: string
  tarifaHora: number
  horas: number
  detallesTarea: string
}

export default function HorasFreelancer() {
  const [entradas, setEntradas] = useState<HorasFreelancer[]>([])
  const [fecha, setFecha] = useState('')
  const [tarifaHora, setTarifaHora] = useState('')
  const [horas, setHoras] = useState('')
  const [detallesTarea, setDetallesTarea] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevaEntrada: HorasFreelancer = {
      id: Date.now(),
      fecha,
      tarifaHora: parseFloat(tarifaHora),
      horas: parseFloat(horas),
      detallesTarea
    }
    setEntradas([...entradas, nuevaEntrada])
    setFecha('')
    setTarifaHora('')
    setHoras('')
    setDetallesTarea('')
  }

  const datosGrafico = entradas.map(entrada => ({
    fecha: entrada.fecha,
    ganancias: entrada.tarifaHora * entrada.horas
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Horas Freelancer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Horas Freelancer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tarifaHora">Tarifa por Hora</Label>
                <Input
                  id="tarifaHora"
                  type="number"
                  step="0.01"
                  value={tarifaHora}
                  onChange={(e) => setTarifaHora(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="horas">Horas Trabajadas</Label>
                <Input
                  id="horas"
                  type="number"
                  step="0.25"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="detallesTarea">Detalles de la Tarea</Label>
                <Textarea
                  id="detallesTarea"
                  value={detallesTarea}
                  onChange={(e) => setDetallesTarea(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Agregar Entrada</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Ganancias</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                ganancias: {
                  label: "Ganancias",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={datosGrafico}>
                <Bar dataKey="ganancias" fill="var(--color-ganancias)" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Horas Freelancer</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tarifa por Hora</TableHead>
                <TableHead>Horas Trabajadas</TableHead>
                <TableHead>Ganancias</TableHead>
                <TableHead>Detalles de la Tarea</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entradas.map((entrada) => (
                <TableRow key={entrada.id}>
                  <TableCell>{entrada.fecha}</TableCell>
                  <TableCell>${entrada.tarifaHora.toFixed(2)}</TableCell>
                  <TableCell>{entrada.horas}</TableCell>
                  <TableCell>${(entrada.tarifaHora * entrada.horas).toFixed(2)}</TableCell>
                  <TableCell>{entrada.detallesTarea}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

