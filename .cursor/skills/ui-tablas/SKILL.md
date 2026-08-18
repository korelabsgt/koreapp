---
name: ui-tablas
description: Tablas de datos KORE con toolbar integrado, fondo zinc, acentos celeste-kore, paginación centrada y vista lista/tarjetas. Se usa al crear o refactorizar tablas, listados con búsqueda, paginación, exportación o alinear tablas existentes al patrón de DashboardProyectos.
---

# Tablas de datos

Referencia canónica: `src/components/(Kore)/proyectos/DashboardProyectos/DashboardProyectos.tsx` (sección admin «Lista de Proyectos»).

Plantillas copiables: [plantillas.md](plantillas.md).

## Cuándo aplicar

- Tabla nueva con búsqueda, orden, paginación o exportación.
- Refactor de `<table>` existente que no siga el patrón.
- Usuario pide «tabla como proyectos» o «mismo estilo de tabla».

## Estructura obligatoria

Un solo bloque contenedor; **no** separar buscador del encabezado de la tabla.

```
┌─ Contenedor zinc (rounded-2xl) ─────────────────────┐
│ [Título + Total]          [Export] [Orden ▼]        │
│ Toolbar: [Buscador flex-1] [Lista|Tarjetas]         │
│ Tabla o grid de tarjetas                             │
│ Footer: [◀ 1/1 ▶ + filas/pág] centrado              │
└──────────────────────────────────────────────────────┘
```

## Paleta

| Elemento | Clases |
|----------|--------|
| Contenedor | `rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-900/90 overflow-hidden` |
| Título | `font-black uppercase tracking-wider text-celeste-kore` |
| Total | `text-[11px] font-bold text-celeste-kore/70` |
| Inputs / selects toolbar | `bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl` |
| Encabezado `<thead>` | `bg-zinc-200/70 dark:bg-zinc-800` — texto columnas `text-celeste-kore` |
| Fila | `border-b border-zinc-200/80 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 even:bg-zinc-100/40 dark:even:bg-zinc-800/25` |
| Texto principal celda | `text-black dark:text-white` |
| Porcentajes secundarios | `text-[10px] text-black dark:text-white` |
| Montos destacados / saldo | `text-celeste-kore font-bold` o `font-black` |
| Footer | `border-t border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/60 dark:bg-zinc-800/40` |

Acento de marca: `celeste-kore` (`#B7494E`). Fondos siempre zinc; **no** usar `celeste-kore` como fondo de `<thead>`.

## Toolbar

1. **Buscador** — `flex-1`, `h-11`, icono `Search` a la izquierda, placeholder en minúsculas normales (no `UPPERCASE`).
2. **Lista / Tarjetas** — grupo `w-full` en móvil; cada botón `flex-1 justify-center` (50/50). En `lg+` ancho automático.
3. **Export y orden** — misma fila que el título; en móvil cada control `flex-1` (50/50 ancho).
4. Acciones de página (Nuevo, Añadir) van **fuera** del bloque tabla, en el header de pantalla.

## Tabla (`viewMode === "lista"`)

- `<table className="w-full min-w-[…] text-left text-xs border-collapse">` — ajustar `min-w` según columnas.
- `<th>`: `px-4 py-3 font-black whitespace-nowrap text-[9px] uppercase tracking-widest`.
- Código: badge `text-celeste-kore bg-celeste-kore/10 border border-celeste-kore/20`.
- **Código sticky en móvil** (`max-lg:sticky max-lg:left-0`): fondo sólido según zebra + `border-r` + sombra lateral al hacer scroll horizontal.
- Nombre: `font-semibold text-black dark:text-white group-hover:text-celeste-kore`.
- Teléfono: pill `rounded-full border border-celeste-kore/30 bg-celeste-kore/10` + icono `Phone`.
- Estado: pill `text-[9px] font-black uppercase`; activo `bg-celeste-kore/10 text-celeste-kore`.
- Columnas numéricas: `text-right whitespace-nowrap`.
- Filas clicables: `cursor-pointer` + `onClick` en `<tr>`.

## Vista tarjetas (`viewMode === "tarjetas"`)

- `grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 p-5`.
- Card: `rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60`.

## Paginación

- **Siempre visible** (aunque `totalPages === 1`).
- Formato: `{currentPage}/{totalPages}` — sin prefijo «PÁG.».
- Flechas: `p-1 text-muted-foreground hover:text-celeste-kore`, sin caja gruesa.
- `itemsPerPage` en `useState` (default `5`); `Select` compacto `w-[72px]` junto a las flechas.
- Orden (`Más reciente`, etc.) en la **fila del título**, derecha junto a export; trigger `min-w-[10.5rem] whitespace-nowrap`.
- Paginación centrada; sin `absolute`.

```tsx
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);

useEffect(() => { setCurrentPage(1); }, [searchTerm, itemsPerPage]);

const totalPages = useMemo(
  () => Math.ceil(filtered.length / itemsPerPage) || 1,
  [filtered.length, itemsPerPage],
);
const paginated = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
}, [filtered, currentPage, itemsPerPage]);
```

## Ancho

- Pantallas con tablas anchas: contenedor `max-w-7xl` (no `max-w-5xl`).
- Tabla con muchas columnas: `overflow-x-auto` en wrapper + `min-w-[1100px]` (o más).

## Prohibido

- Buscador flotante separado del bloque tabla.
- Encabezado `<thead>` con fondo rojo/azul (`bg-celeste-kore/…`).
- Paginación solo cuando `totalPages > 1`.
- Badge «PÁG. 1 / 3» con borde grueso.
- Porcentajes en `text-celeste-kore/60` o `text-muted-foreground`.
- `Table` de shadcn para listados de datos con este patrón — usar `<table>` nativo.
- Footer solo paginación centrada; sin `absolute`.
- Export en la toolbar superior (va en la fila del título, derecha).

## Checklist al crear o migrar

- [ ] Contenedor zinc único con título + total
- [ ] Toolbar: buscador + toggle lista/tarjetas
- [ ] `<thead>` zinc, columnas en rojo
- [ ] Celdas con patrones de badge, pill y montos
- [ ] Porcentajes en blanco (`dark:text-white`)
- [ ] Fila título: izquierda título+total, derecha export + orden
- [ ] `itemsPerPage` configurable; default 5
- [ ] `max-w-7xl` si la tabla es ancha

## Tablas candidatas a migrar

| Archivo | Notas |
|---------|-------|
| `ClientesDashboard.tsx` | Modal desglose proyectos |
| `clientes/forms/ClientesModal.tsx` | Tabla anidada en acordeón |
| `(users)/usuarios/VerUsuarios.tsx` | Listado usuarios |
| `proyectos/MantenimientoProyectos/MantenimientoProyectos.tsx` | Tabla mantenimiento |

Al migrar: conservar lógica de datos; solo reemplazar markup y clases según este skill.
