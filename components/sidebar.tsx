"use client";

import Link from "next/link";
import { DollarSign, Calendar, Clock, TrendingUp, Home } from "lucide-react";

export function Sidebar() {
  return (
    <div className="bg-secondary/20 text-neutral-600 p-4 flex flex-col w-20 items-center space-y-4 py-6">
      <nav className="flex-1 w-full">
        <ul className="space-y-4 flex flex-col items-center">
          {menuItems.map(({ href, icon, text }) => (
            <SidebarItem key={href} href={href} icon={icon} text={text} />
          ))}
        </ul>
      </nav>
    </div>
  );
}

const menuItems = [
  { href: "/", icon: <Home className="h-6 w-6" />, text: "Inicio" },
  {
    href: "/gastos-diarios",
    icon: <DollarSign className="h-6 w-6" />,
    text: "Gastos Diarios",
  },
  {
    href: "/totales-mensuales",
    icon: <Calendar className="h-6 w-6" />,
    text: "Totales Mensuales",
  },
  {
    href: "/reservas",
    icon: <Calendar className="h-6 w-6" />,
    text: "Reservas",
  },
  {
    href: "/horas-freelancer",
    icon: <Clock className="h-6 w-6" />,
    text: "Horas Freelancer",
  },
  {
    href: "/margen-inesperado",
    icon: <TrendingUp className="h-6 w-6" />,
    text: "Margen Inesperado",
  },
];

function SidebarItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <li className="relative group">
      <Link
        href={href}
        className="flex items-center p-2 rounded-lg hover:bg-primary-foreground hover:text-primary h-9 w-9 justify-center"
      >
        {icon}
      </Link>
      <span className="absolute top-1 left-full ml-2 px-2 py-1 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700 z-50">
        {text}
      </span> 
    </li>
  );
}
