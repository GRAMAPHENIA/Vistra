import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bienvenido al Gestor de Finanzas y Reservas</h1>
      <p className="text-muted-foreground">Resumen general de todas las secciones.</p>
      
      <DashboardOverview />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Gastos Diarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Registra y visualiza tus gastos diarios.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Totales Mensuales</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analiza tus ingresos y gastos mensuales.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reservas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gestiona tus reservas económicas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Horas Freelancer</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Registra tus horas de trabajo y calcula tus ganancias.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Margen Inesperado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Analiza los márgenes inesperados en tus finanzas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

