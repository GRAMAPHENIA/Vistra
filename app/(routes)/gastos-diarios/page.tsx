"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart } from "recharts"

type Gasto = {
  id: number
  fecha: string
  descripcion: string
  monto: number
  metodoPago: string
}

export default function GastosDiarios() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [metodoPago, setMetodoPago] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nuevoGasto: Gasto = {
      id: Date.now(),
      fecha,
      descripcion,
      monto: parseFloat(monto),
      metodoPago
    }
    setGastos([...gastos, nuevoGasto])
    setFecha('')
    setDescripcion('')
    setMonto('')
    setMetodoPago('')
  }

  const datosGrafico = Object.entries(
    gastos.reduce((acc, gasto) => {
      acc[gasto.descripcion] = (acc[gasto.descripcion] || 0) + gasto.monto;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, total]) => ({ name, total }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gastos Diarios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agregar Gasto</CardTitle>
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
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
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
                <Label htmlFor="metodoPago">Método de Pago</Label>
                <Select onValueChange={setMetodoPago} value={metodoPago}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta de Crédito</SelectItem>
                    <SelectItem value="debito">Tarjeta de Débito</SelectItem>
                    <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Agregar Gasto</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Gastos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={datosGrafico}>
                <Bar dataKey="total" fill="var(--color-total)" radius={[4, 4, 0, 0]} />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método de Pago</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gastos.map((gasto) => (
                <TableRow key={gasto.id}>
                  <TableCell>{gasto.fecha}</TableCell>
                  <TableCell>{gasto.descripcion}</TableCell>
                  <TableCell>${gasto.monto.toFixed(2)}</TableCell>
                  <TableCell>{gasto.metodoPago}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

