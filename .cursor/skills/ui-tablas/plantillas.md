# Plantillas — ui-tablas

## Contenedor + toolbar

```tsx
<div className="rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-xl overflow-hidden shadow-none dark:shadow-2xl dark:shadow-black/20">
  <div className="px-5 pt-5 pb-2">
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="min-w-0">
      <h3 className="text-base sm:text-xl font-black uppercase tracking-wider text-celeste-kore">{titulo}</h3>
      <p className="text-[11px] font-bold text-celeste-kore/70 mt-0.5">Total: {total}</p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      {/* Exportar + Select orden */}
    </div>
  </div>
  </div>

  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 px-5 py-4">
    <div className="relative flex-1 min-w-0">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder="Buscar por…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/80 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-celeste-kore/40 transition-all placeholder:text-muted-foreground/50"
      />
    </div>

    <div className="flex items-center gap-2 shrink-0">
      <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden">
        <button
          type="button"
          onClick={() => setViewMode("lista")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${viewMode === "lista" ? "bg-celeste-kore text-white" : "bg-transparent text-muted-foreground hover:text-celeste-kore"}`}
        >
          <List size={14} />
          Lista
        </button>
        <button
          type="button"
          onClick={() => setViewMode("tarjetas")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer border-l border-zinc-200 dark:border-zinc-700 ${viewMode === "tarjetas" ? "bg-celeste-kore text-white" : "bg-transparent text-muted-foreground hover:text-celeste-kore"}`}
        >
          <LayoutGrid size={14} />
          Tarjetas
        </button>
      </div>
      {/* Lista / Tarjetas — orden va en fila del título */}
    </div>
  </div>
```

## Tabla

```tsx
<div className="overflow-x-auto border-t border-zinc-200 dark:border-zinc-700/80">
  <table className="w-full min-w-[1100px] text-left text-xs border-collapse">
    <thead className="bg-zinc-200/70 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700/80">
      <tr className="text-[9px] text-celeste-kore uppercase tracking-widest">
        <th className="px-4 py-3 font-black whitespace-nowrap">Columna</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          className="group border-b border-zinc-200/80 dark:border-zinc-700/50 last:border-0 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 even:bg-zinc-100/40 dark:even:bg-zinc-800/25 odd:bg-transparent cursor-pointer transition-colors"
        >
          <td className="px-4 py-3 whitespace-nowrap">
            <span className="font-bold text-celeste-kore bg-celeste-kore/10 px-1.5 py-0.5 rounded border border-celeste-kore/20">{row.codigo}</span>
          </td>
          <td className="px-4 py-3 whitespace-nowrap">
            <p className="font-semibold text-black dark:text-white group-hover:text-celeste-kore transition-colors">{row.nombre}</p>
          </td>
          <td className="px-4 py-3 text-right whitespace-nowrap">
            <p className="font-black text-black dark:text-white">Q{monto}</p>
            {pct != null && <p className="text-[10px] text-black dark:text-white">{pct}%</p>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

## Pill teléfono

```tsx
<span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-celeste-kore border border-celeste-kore/30 rounded-full px-2 py-0.5 bg-celeste-kore/10 whitespace-nowrap">
  <Phone size={10} className="shrink-0" />
  {telefono}
</span>
```

## Footer paginación

```tsx
<div className="flex items-center justify-center gap-2 px-5 py-4 border-t border-zinc-200 dark:border-zinc-700/80 bg-zinc-100/60 dark:bg-zinc-800/40">
    <button
      type="button"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      className="p-1 text-muted-foreground hover:text-celeste-kore disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
    >
      <ChevronLeft size={18} />
    </button>
    <span className="text-sm font-medium text-foreground min-w-[40px] text-center select-none">
      {currentPage}/{totalPages}
    </span>
    <button
      type="button"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      className="p-1 text-muted-foreground hover:text-celeste-kore disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
    >
      <ChevronRight size={18} />
    </button>
    <Select value={String(itemsPerPage)} onValueChange={(v) => setItemsPerPage(Number(v))}>
      <SelectTrigger className="h-9 w-[72px] ml-2 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-celeste-kore/40 cursor-pointer outline-none px-2">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-card border-border/50 shadow-xl rounded-xl z-[200]">
        <SelectItem value="5" className="cursor-pointer">5</SelectItem>
        <SelectItem value="10" className="cursor-pointer">10</SelectItem>
        <SelectItem value="15" className="cursor-pointer">15</SelectItem>
        <SelectItem value="25" className="cursor-pointer">25</SelectItem>
      </SelectContent>
    </Select>
  </div>
```
