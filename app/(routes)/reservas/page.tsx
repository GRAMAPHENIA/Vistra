"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"

type Reserva = {
  id: number
  concepto: string
  monto: number
  fecha: string
}

export default function Reservas() {
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [concepto, setConcepto] = useState('')
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevaReserva: Reserva = {
      id: Date.now(),
      concepto,
      monto: parseFloat(monto),
      fecha
    }
    setReservas([...reservas, nuevaReserva])
    setConcepto('')
    setMonto('')
    setFecha('')
  }

  const datosGrafico = reservas.reduce((acc, reserva) => {
    const concepto = reserva.concepto
    const existingConcepto = acc.find(item => item.name === concepto)
    if (existingConcepto) {
      existingConcepto.value += reserva.monto
    } else {
      acc.push({ name: concepto, value: reserva.monto })
    }
    return acc
  }, [] as { name: string; value: number }[])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reservas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="concepto">Concepto</Label>
                <Input
                  id="concepto"
                  value={concepto}
                  onChange={(e) => setConcepto(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="monto">Monto</Label>
                <Input
                  id="monto"
                  type="number"
                  step="0.01"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                />
              </div>
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
              <Button type="submit">Agregar Reserva</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reservas por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={Object.fromEntries(datosGrafico.map(item => [
                item.name,
                {
                  label: item.name,
                  color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                }
              ]))}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={datosGrafico}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {datosGrafico.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--color-${entry.name})`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservas.map((reserva) => (
                <TableRow key={reserva.id}>
                  <TableCell>{reserva.fecha}</TableCell>
                  <TableCell>{reserva.concepto}</TableCell>
                  <TableCell>${reserva.monto.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

