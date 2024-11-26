"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, DollarSign, Calendar, Clock, TrendingUp, Home } from 'lucide-react'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={`bg-secondary/20 text-secondary-foreground p-4 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <Button 
        variant="ghost" 
        size="icon"
        className="mb-4 w-full flex justify-center"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </Button>
      <nav>
        <ul className="space-y-2">
          <SidebarItem href="/" icon={<Home />} text="Inicio" isCollapsed={isCollapsed} />
          <SidebarItem href="/gastos-diarios" icon={<DollarSign />} text="Gastos Diarios" isCollapsed={isCollapsed} />
          <SidebarItem href="/totales-mensuales" icon={<Calendar />} text="Totales Mensuales" isCollapsed={isCollapsed} />
          <SidebarItem href="/reservas" icon={<Calendar />} text="Reservas" isCollapsed={isCollapsed} />
          <SidebarItem href="/horas-freelancer" icon={<Clock />} text="Horas Freelancer" isCollapsed={isCollapsed} />
          <SidebarItem href="/margen-inesperado" icon={<TrendingUp />} text="Margen Inesperado" isCollapsed={isCollapsed} />
        </ul>
      </nav>
    </div>
  )
}

function SidebarItem({ href, icon, text, isCollapsed }: { href: string; icon: React.ReactNode; text: string; isCollapsed: boolean }) {
  return (
    <li>
      <Link href={href} className={`flex items-center p-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors ${isCollapsed ? 'justify-center' : ''}`}>
        {icon}
        <span className={`ml-2 transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>
          {text}
        </span>
      </Link>
    </li>
  )
}

