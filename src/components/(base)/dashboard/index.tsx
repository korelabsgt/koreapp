"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Banknote,
  Calendar,
  CalendarDays,
  ChartBar,
  ClipboardList,
  FolderKanban,
  ListChecks,
  Network,
  UserRoundCheck,
  Users,
} from "lucide";

import { useUserContext } from "@/components/(base)/providers/UserProvider";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type LucideIcon = typeof FolderKanban;

type Module = {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
  iconActive: LucideIcon;
  href: string;
  className: string;
  featured?: boolean;
  background: ReactNode;
  iconPlacement?: "header" | "content-right" | "content-right-large";
  allowedRoles?: string[];
  requiresAdmin?: boolean;
};

const PROJECT_SNIPPETS = [
  { name: "En progreso", body: "Trabajo en curso" },
  { name: "Activo", body: "En ejecución" },
  { name: "En pausa", body: "Suspendido temporalmente" },
];

const CLIENT_SNIPPETS = [
  { name: "Contacto principal", meta: "Actualizado hoy" },
  { name: "Empresa asociada", meta: "3 proyectos activos" },
];

const FINANCE_BARS = [38, 62, 48, 74, 55, 68, 42];

const ORG_TASK_LABELS = [
  "Entregables del sprint",
  "Asignaciones pendientes",
  "Revisión con el equipo",
] as const;

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function OrgPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [checkedCount, setCheckedCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const card = rootRef.current?.closest("button");
    if (!card) return;

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (paused) return;

    const intervalId = window.setInterval(() => {
      setCheckedCount((prev) =>
        prev >= ORG_TASK_LABELS.length ? 0 : prev + 1,
      );
    }, 1500);

    return () => window.clearInterval(intervalId);
  }, [paused]);

  const pending = ORG_TASK_LABELS.length - checkedCount;

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full items-start justify-start px-3 pt-2"
    >
      <div className="w-full max-w-[12.5rem] origin-top-left scale-[0.92] rounded-lg border border-zinc-400 bg-zinc-300 p-2.5 transition-transform duration-300 group-hover:scale-100 dark:border-zinc-600 dark:bg-zinc-800">
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100">
            Tareas del equipo
          </p>
          <span className="shrink-0 rounded-full bg-celeste-kore/15 px-1.5 py-0.5 text-[8px] font-bold tabular-nums text-celeste-kore transition-all duration-300">
            {pending} pend.
          </span>
        </div>
        <ul className="space-y-1">
          {ORG_TASK_LABELS.map((label, idx) => {
            const done = idx < checkedCount;
            const isNext =
              idx === checkedCount && checkedCount < ORG_TASK_LABELS.length;

            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-1.5 rounded-sm px-0.5 transition-colors duration-300",
                  isNext && "bg-celeste-kore/10",
                )}
              >
                <span
                  className={cn(
                    "flex size-3.5 shrink-0 items-center justify-center rounded border text-[8px] font-bold leading-none transition-all duration-300",
                    done
                      ? "scale-100 border-celeste-kore bg-celeste-kore text-white"
                      : "scale-95 border-zinc-400 bg-zinc-200 text-transparent dark:border-zinc-500 dark:bg-zinc-700",
                    isNext && "border-celeste-kore/60",
                  )}
                >
                  {done ? "✓" : ""}
                </span>
                <span
                  className={cn(
                    "truncate text-[9px] font-medium transition-all duration-300",
                    done
                      ? "text-zinc-500 line-through dark:text-zinc-400"
                      : "text-zinc-800 dark:text-zinc-200",
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function CalendarPreview() {
  const today = new Date();
  const monthLabel = format(today, "MMMM yyyy", { locale: es });
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  const cells: Array<{ day: number | null; isToday: boolean }> = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, isToday: false });
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, isToday: day === todayDate });
  }

  return (
    <div className="flex h-full w-full items-start justify-start px-3 pt-2">
      <div className="w-[10.5rem] origin-top-left scale-[0.92] rounded-lg border border-zinc-400 bg-zinc-300 p-2.5 transition-transform duration-300 group-hover:scale-100 dark:border-zinc-600 dark:bg-zinc-800">
        <p className="mb-2 text-center text-[11px] font-bold capitalize text-zinc-900 dark:text-zinc-100">
          {monthLabel}
        </p>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[8px] font-semibold text-zinc-400">
          {WEEKDAYS.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-0.5 text-center text-[9px]">
          {cells.map((cell, idx) => (
            <span
              key={idx}
              className={cn(
                "flex h-5 items-center justify-center rounded-sm",
                cell.day === null && "invisible",
                cell.isToday &&
                  "bg-celeste-kore font-bold text-white dark:text-white",
                !cell.isToday && cell.day !== null && "text-zinc-700 dark:text-zinc-300",
              )}
            >
              {cell.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const MODULES: Module[] = [
  {
    id: "proyectos",
    title: "Proyectos",
    subtitle: "Gestión de",
    desc: "Administración, control financiero y seguimiento del estado de los proyectos.",
    icon: FolderKanban,
    iconActive: ClipboardList,
    href: "/kore/proyectos",
    className: "md:col-start-1 md:row-span-2 md:row-start-1",
    featured: true,
    allowedRoles: ["super", "admin", "proyectos"],
    background: (
      <div className="flex h-full w-full items-center justify-center px-2">
        <Marquee pauseOnHover className="w-full [--duration:28s]">
          {PROJECT_SNIPPETS.map((item, idx) => (
            <figure
              key={idx}
              className={cn(
                "relative w-32 shrink-0 overflow-hidden rounded-lg border p-3",
                "border-zinc-400 bg-zinc-300 dark:border-zinc-600 dark:bg-zinc-800",
              )}
            >
              <figcaption className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                {item.name}
              </figcaption>
              <blockquote className="mt-0.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                {item.body}
              </blockquote>
            </figure>
          ))}
        </Marquee>
      </div>
    ),
  },
  {
    id: "organizacion",
    title: "Organización",
    subtitle: "Grupo y",
    desc: "Organización de grupo, tareas, asignaciones y seguimiento del equipo.",
    icon: Network,
    iconActive: ListChecks,
    href: "/kore/organizacion",
    className: "md:col-start-2 md:col-span-2 md:row-start-1",
    iconPlacement: "content-right-large",
    allowedRoles: ["super", "admin", "proyectos"],
    background: <OrgPreview />,
  },
  {
    id: "clientes",
    title: "Clientes",
    subtitle: "Gestión de",
    desc: "Administración de clientes y contactos de la empresa.",
    icon: Users,
    iconActive: UserRoundCheck,
    href: "/kore/clientes",
    className: "",
    iconPlacement: "content-right",
    allowedRoles: ["super", "admin", "proyectos"],
    background: (
      <div className="flex h-full w-full items-center justify-center gap-2 px-3">
        {CLIENT_SNIPPETS.map((item, idx) => (
          <div
            key={idx}
            className="w-full max-w-[9.5rem] rounded-lg border border-zinc-400 bg-zinc-300 px-2.5 py-2 dark:border-zinc-600 dark:bg-zinc-800"
          >
            <p className="truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
              {item.name}
            </p>
            <p className="truncate text-[9px] text-zinc-500 dark:text-zinc-400">
              {item.meta}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "calendario",
    title: "Calendario",
    subtitle: "Módulo de",
    desc: "Agenda, fechas clave y seguimiento de actividades del equipo.",
    icon: Calendar,
    iconActive: CalendarDays,
    href: "/kore/calendario",
    className: "md:col-start-3 md:row-start-2",
    allowedRoles: ["super", "admin", "proyectos", "finanzas"],
    background: <CalendarPreview />,
  },
  {
    id: "finanzas",
    title: "Finanzas",
    subtitle: "Módulo de",
    desc: "Administración de gastos, métricas y control de flujo de caja.",
    icon: Banknote,
    iconActive: ChartBar,
    href: "/kore/finanzas",
    className: "md:col-start-2 md:row-start-2",
    allowedRoles: ["super", "admin", "finanzas"],
    background: (
      <div className="flex h-full w-full items-end justify-center gap-1.5 px-6 pb-2">
        {FINANCE_BARS.map((height, idx) => (
          <div
            key={idx}
            className="w-4 rounded-t-sm bg-zinc-500 dark:bg-zinc-500"
            style={{ height: `${height}%`, maxHeight: "4.5rem" }}
          />
        ))}
      </div>
    ),
  },
];

function getModuleLayout(
  mod: Module,
  visibleIds: Set<string>,
): string {
  const hasCalendario = visibleIds.has("calendario");
  const hasFinanzas = visibleIds.has("finanzas");

  if (mod.id === "proyectos") {
    return "md:col-start-1 md:row-span-2 md:row-start-1";
  }
  if (mod.id === "organizacion") {
    if (hasCalendario && hasFinanzas) {
      return "md:col-start-2 md:col-span-2 md:row-start-1";
    }
    return "md:col-start-2 md:row-start-1";
  }
  if (mod.id === "clientes") {
    return "md:col-start-2 md:row-start-1";
  }
  if (mod.id === "finanzas") {
    if (hasCalendario) return "md:col-start-2 md:row-start-2";
    return "md:col-start-2 md:col-span-2 md:row-start-2";
  }
  if (mod.id === "calendario") {
    if (hasFinanzas) return "md:col-start-3 md:row-start-2";
    return "md:col-start-2 md:col-span-2 md:row-start-2";
  }
  return mod.className;
}

function getBentoGridClass(visibleIds: Set<string>): string {
  const hasSplitBottom =
    visibleIds.has("calendario") && visibleIds.has("finanzas");

  if (hasSplitBottom) {
    return "md:grid-cols-[minmax(0,9fr)_minmax(0,5.5fr)_minmax(0,5.5fr)] md:grid-rows-[auto_auto]";
  }
  if (visibleIds.size >= 3) {
    return "md:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] md:grid-rows-[auto_auto]";
  }
  return "md:grid-cols-3";
}

export function Dashboard() {
  const { effectiveRole } = useUserContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isSuperOrAdmin = ["super", "admin"].includes(effectiveRole);

  const visibleModules = MODULES.filter((mod) => {
    if (mod.requiresAdmin && !isSuperOrAdmin) return false;
    if (mod.allowedRoles && !mod.allowedRoles.includes(effectiveRole))
      return false;
    return true;
  });

  const handleCardClick = (id: string, href: string) => {
    if (isMobile) {
      if (activeId === id) {
        router.push(href);
      } else {
        setActiveId(id);
      }
    } else {
      router.push(href);
    }
  };

  const renderCardsGrid = () => {
    const sortedModules = isMobile
      ? [...visibleModules].sort((a, b) => {
          const order = [
            "proyectos",
            "clientes",
            "organizacion",
            "finanzas",
            "calendario",
          ];
          return order.indexOf(a.id) - order.indexOf(b.id);
        })
      : visibleModules;

    const visibleIds = new Set(sortedModules.map((mod) => mod.id));
    const hasLeftStack =
      !isMobile &&
      visibleIds.has("proyectos") &&
      visibleIds.has("clientes");
    const proyectosMod = sortedModules.find((mod) => mod.id === "proyectos");
    const clientesMod = sortedModules.find((mod) => mod.id === "clientes");

    const renderCard = (
      mod: Module,
      className: string,
      options?: { fillContainer?: boolean },
    ) => (
      <BentoCard
        key={mod.id}
        id={`${mod.id}-card`}
        name={mod.title}
        subtitle={mod.subtitle}
        description={mod.desc}
        icon={mod.icon}
        iconActive={mod.iconActive}
        background={mod.background}
        featured={mod.featured}
        fillContainer={options?.fillContainer}
        iconPlacement={mod.iconPlacement}
        className={cn("h-full", className)}
        isActive={isMobile && activeId === mod.id}
        isHovered={hoveredId === mod.id}
        onMouseEnter={() => setHoveredId(mod.id)}
        onMouseLeave={() => setHoveredId(null)}
        onFocus={() => setHoveredId(mod.id)}
        onBlur={() => setHoveredId(null)}
        onClick={() => handleCardClick(mod.id, mod.href)}
      />
    );

    return (
      <BentoGrid className={getBentoGridClass(visibleIds)}>
        {hasLeftStack && proyectosMod && clientesMod ? (
          <div className="md:col-start-1 md:row-span-2 md:row-start-1 md:grid md:h-full md:min-h-0 md:grid-rows-[3fr_2fr] md:gap-5">
            {renderCard(proyectosMod, "h-full min-h-0", { fillContainer: true })}
            {renderCard(clientesMod, "h-full min-h-0", { fillContainer: true })}
          </div>
        ) : null}
        {sortedModules
          .filter(
            (mod) =>
              !hasLeftStack || !["proyectos", "clientes"].includes(mod.id),
          )
          .map((mod) =>
            renderCard(mod, getModuleLayout(mod, visibleIds)),
          )}
      </BentoGrid>
    );
  };

  return (
    <div className="relative flex w-full flex-1 flex-col px-4 pb-4 md:justify-center md:px-8 md:pb-0 lg:px-12">
      <div className="mx-auto w-full max-w-[90vw] xl:max-w-7xl">
        {renderCardsGrid()}
      </div>
    </div>
  );
}
