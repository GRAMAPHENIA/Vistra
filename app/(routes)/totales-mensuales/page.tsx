"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

type MonthlyTotal = {
  id: number
  month: string
  income: number
  expenses: number
}

export default function MonthlyTotals() {
  const [totals, setTotals] = useState<MonthlyTotal[]>([])
  const [month, setMonth] = useState('')
  const [income, setIncome] = useState('')
  const [expenses, setExpenses] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTotal: MonthlyTotal = {
      id: Date.now(),
      month,
      income: parseFloat(income),
      expenses: parseFloat(expenses)
    }
    setTotals([...totals, newTotal])
    setMonth('')
    setIncome('')
    setExpenses('')
  }

  const chartData = totals.map(total => ({
    name: total.month,
    income: total.income,
    expenses: total.expenses
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Monthly Totals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="income">Income</Label>
                <Input
                  id="income"
                  type="number"
                  step="0.01"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="expenses">Expenses</Label>
                <Input
                  id="expenses"
                  type="number"
                  step="0.01"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Add Monthly Total</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Totals Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="income" fill="#8884d8" name="Income" />
                <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Monthly Totals List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Expenses</TableHead>
                <TableHead>Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totals.map((total) => (
                <TableRow key={total.id}>
                  <TableCell>{total.month}</TableCell>
                  <TableCell>${total.income.toFixed(2)}</TableCell>
                  <TableCell>${total.expenses.toFixed(2)}</TableCell>
                  <TableCell>${(total.income - total.expenses).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

