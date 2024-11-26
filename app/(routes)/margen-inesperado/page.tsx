"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

type MargenInesperado = {
  id: number
  fecha: string
  porcentaje: number
  margenTotal: number
}

export default function MargenInesperado() {
  const [margenes, setMargenes] = useState<MargenInesperado[]>([])
  const [fecha, setFecha] = useState('')
  const [porcentaje, setPorcentaje] = useState('')
  const [margenTotal, setMargenTotal] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevoMargen: MargenInesperado = {
      id: Date.now(),
      fecha,
      porcentaje: parseFloat(porcentaje),
      margenTotal: parseFloat(margenTotal)
    }
    setMargenes([...margenes, nuevoMargen])
    setFecha('')
    setPorcentaje('')
    setMargenTotal('')
  }

  const datosGrafico = margenes.map(margen => ({
    fecha: margen.fecha,
    Porcentaje: margen.porcentaje,
    "Margen Total": margen.margenTotal
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Margen Inesperado</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Margen Inesperado</CardTitle>
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
                <Label htmlFor="porcentaje">Porcentaje</Label>
                <Input
                  id="porcentaje"
                  type="number"
                  step="0.01"
                  value={porcentaje}
                  onChange={(e) => setPorcentaje(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="margenTotal">Margen Total</Label>
                <Input
                  id="margenTotal"
                  type="number"
                  step="0.01"
                  value={margenTotal}
                  onChange={(e) => setMargenTotal(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Agregar Margen</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Margen Inesperado</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                Porcentaje
: {
                  label: "Porcentaje",
                  color: "hsl(var(--primary))",
                },
                "Margen Total": {
                  label: "Margen Total",
                  color: "hsl(var(--secondary))",
                },
              }}
              className="h-[300px]"
            >
              <LineChart data={datosGrafico}>
                <Line type="monotone" dataKey="Porcentaje" stroke="var(--color-Porcentaje)" />
                <Line type="monotone" dataKey="Margen Total" stroke="var(--color-Margen Total)" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Márgenes Inesperados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Porcentaje</TableHead>
                <TableHead>Margen Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {margenes.map((margen) => (
                <TableRow key={margen.id}>
                  <TableCell>{margen.fecha}</TableCell>
                  <TableCell>{margen.porcentaje.toFixed(2)}%</TableCell>
                  <TableCell>${margen.margenTotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

