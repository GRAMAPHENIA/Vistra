
# Gestor de Finanzas y Reservas

Una aplicación moderna para la gestión de finanzas personales y reservas, construida con Next.js, TypeScript, TailwindCSS y componentes Radix UI.

## Características

- **Gestión de Finanzas:**
  - Agregar, editar y eliminar transacciones.
  - Categorizar ingresos y gastos.
  - Visualización de estadísticas financieras con gráficos interactivos.

- **Gestión de Reservas:**
  - Agregar y actualizar reservas personales o profesionales.
  - Organizar y filtrar reservas por fecha o categoría.
  - Notificaciones visuales para eventos próximos.

## Comenzar

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

3. Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## Stack Tecnológico

- Next.js 14
- TypeScript
- Tailwind CSS
- Radix UI
- Recharts para gráficos
- clsx para manejo dinámico de clases
- tailwind-merge para manejo de utilidades de diseño

## Estructura del Proyecto

- `/components` - Componentes reutilizables de React.
- `/lib` - Funciones de utilidad y lógica compartida.
- `/types` - Definiciones de tipos en TypeScript.
- `/app` - Páginas manejadas por el router de Next.js.

## Capturas de pantalla

### Vista principal

![Vista principal](/public/vista-principal.png)

### Estadísticas de Finanzas

![Estadísticas](/public/estadisticas-finanzas.png)

