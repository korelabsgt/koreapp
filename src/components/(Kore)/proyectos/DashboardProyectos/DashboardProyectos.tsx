"use client";

import { motion, AnimatePresence, animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Wrench,
  Hammer,
  Plus,
  CirclePlus,
  Download,
  FileDown,
  Search,
  ScanSearch,
  ChevronLeft,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
  MoveRight,
  ArrowUpRight,
  PieChart as LucidePieChart,
  FolderKanban,
  CircleDollarSign,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Calendar,
  CalendarDays,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ArrowDownAZ,
  ArrowUpAZ,
  Clock,
  History,
  CaseSensitive,
} from "lucide";
import { MorphIcon } from "morphicons/react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  Rectangle,
} from "recharts";
import { useProyectos } from "@/components/(Kore)/proyectos/lib/hooks";
import { getProyectoVerPath, ESTADO_PROYECTO_CHART_COLOR, getEstadoProyectoBadgeClass } from "@/components/(Kore)/proyectos/lib/helpers";
import { ESTADOS_PROYECTO, normalizeEstadoProyecto, Proyecto } from "@/components/(Kore)/proyectos/lib/zod";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import QRProyecto from "../QRProyecto/QRProyecto";
import { RangeDateSegmentInput } from "./RangeDateSegmentInput";
import { useUserContext } from "@/components/(base)/providers/UserProvider";


// TypeScript declaration for the Lordicon web component
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        trigger?: string;
        colors?: string;
        style?: React.CSSProperties;
      };
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

const monthsFull = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const monthsAbbr = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

type EstadoPieSectorProps = {
  index?: number;
  outerRadius?: number;
  innerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: number;
  cy?: number;
  fill?: string;
};

const ESTADO_PIE_ACTIVE_OUTER_OFFSET = 5;
const INGRESO_BAR_PRECIO_COLOR = "#B7494E";
const INGRESO_BAR_COMISION_COLOR = "#22c55e";
const INGRESO_BAR_IVA_COLOR = "#0ea5e9";

type IngresoBarPoint = {
  name: string;
  dateStr?: string;
  precio: number;
  comision: number;
  iva: number;
  neto: number;
  sortKey?: number;
};

function IngresoBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload: IngresoBarPoint }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-white shadow-xl">
      <p className="mb-1.5 font-bold">{label}</p>
      {point.comision > 0 ? (
        <p>Comisión: Q {point.comision.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      ) : null}
      {point.iva > 0 ? (
        <p>IVA: Q {point.iva.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      ) : null}
      <p>Precio: Q {point.precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
    </div>
  );
}

const INGRESO_BAR_SEGMENT_RADIUS = 8;
const INGRESO_BAR_SIZE = 16;

type IngresoBarShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
};

function IngresoOverlayBarShape(props: IngresoBarShapeProps) {
  const { x = 0, y = 0, width = 0, height = 0, fill } = props;
  if (height <= 0 || width <= 0) return null;

  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[INGRESO_BAR_SEGMENT_RADIUS, INGRESO_BAR_SEGMENT_RADIUS, 0, 0]}
    />
  );
}

const ESTADO_PIE_CENTER_EASE = [0.4, 0, 0.2, 1] as const;
const ESTADO_PIE_MOTION = {
  duration: 0.35,
  ease: ESTADO_PIE_CENTER_EASE,
} as const;

const ESTADO_TABLE_BADGE_CLASS =
  "inline-flex w-[7rem] items-center justify-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border";

const ROW_HOVER_TEXT_CLASS =
  "text-black dark:text-white transition-colors group-hover:text-celeste-kore";
const ROW_ACCENT_CLASS = "text-celeste-kore transition-colors group-hover:text-celeste-kore";

function EstadoPieSector({
  activeIndex,
  cornerRadius,
  ...props
}: EstadoPieSectorProps & { activeIndex: number; cornerRadius: number }) {
  const isActive = props.index === activeIndex && activeIndex >= 0;
  const baseOuter = typeof props.outerRadius === "number" ? props.outerRadius : 0;
  const motionOuter = useMotionValue(baseOuter);
  const [outerRadius, setOuterRadius] = useState(baseOuter);

  useMotionValueEvent(motionOuter, "change", setOuterRadius);

  useEffect(() => {
    const target = isActive ? baseOuter + ESTADO_PIE_ACTIVE_OUTER_OFFSET : baseOuter;
    return animate(motionOuter, target, ESTADO_PIE_MOTION).stop;
  }, [baseOuter, isActive, motionOuter]);

  return <Sector {...props} outerRadius={outerRadius} cornerRadius={cornerRadius} />;
}

const PROYECTOS_ACTION_BTN_CLASS =
  "flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-celeste-kore px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-celeste-kore/90 sm:flex-none sm:px-4 sm:py-2 sm:text-[10px]";

const PROYECTO_SORT_OPTIONS = [
  { value: "newest", label: "Más reciente", shortLabel: "Reciente", icon: ArrowDownWideNarrow, iconActive: Clock },
  { value: "oldest", label: "Menos reciente", shortLabel: "Antiguo", icon: ArrowUpWideNarrow, iconActive: History },
  { value: "alphabetical", label: "A-Z", shortLabel: "A-Z", icon: ArrowDownAZ, iconActive: CaseSensitive },
  { value: "alphabetical-desc", label: "Z-A", shortLabel: "Z-A", icon: ArrowUpAZ, iconActive: CaseSensitive },
] as const;

const PROYECTO_SORT_CONTROL_WIDTH_CLASS = "w-[3.25rem] sm:w-[3.5rem]";

type ProyectoSort = (typeof PROYECTO_SORT_OPTIONS)[number]["value"];

type LucideIconData = typeof Wrench;

const GT_MONTH_ABBR = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"] as const;

function getGtDateParts(date: Date) {
  const gt = { timeZone: "America/Guatemala" } as const;
  const weekdayRaw = date.toLocaleDateString("es-GT", { ...gt, weekday: "short" });
  const weekday = `${weekdayRaw.charAt(0).toUpperCase()}${weekdayRaw.slice(1).replace(/\.$/, "")}`;
  const day = date.toLocaleDateString("en-US", { ...gt, day: "2-digit" });
  const monthIndex = Number(date.toLocaleDateString("en-US", { ...gt, month: "numeric" })) - 1;
  const year = date.toLocaleDateString("en-US", { ...gt, year: "2-digit" });

  return {
    weekday,
    day,
    month: GT_MONTH_ABBR[monthIndex] ?? "---",
    year,
  };
}

function ProyectoTableFecha({ dateStr }: { dateStr: string | null | undefined }) {
  if (!dateStr) {
    return <p className={cn("text-[10px] font-semibold", ROW_HOVER_TEXT_CLASS)}>—</p>;
  }

  const date = new Date(dateStr.includes("T") ? dateStr : `${dateStr.split("T")[0]}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return <p className={cn("text-[10px] font-semibold", ROW_HOVER_TEXT_CLASS)}>—</p>;
  }

  const { weekday, day, month, year } = getGtDateParts(date);

  return (
    <p className={cn("text-[10px] font-semibold", ROW_HOVER_TEXT_CLASS)}>
      {weekday} {day}
      <span className={cn("font-black", ROW_ACCENT_CLASS)}>{month}</span>
      {year}
    </p>
  );
}

function DashboardMorphIcon({
  icon,
  iconActive,
  size = 16,
  strokeWidth = 2,
  className,
  wrapperClassName,
  engaged,
}: {
  icon: LucideIconData;
  iconActive: LucideIconData;
  size?: number;
  strokeWidth?: number;
  className?: string;
  wrapperClassName?: string;
  engaged?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = engaged !== undefined ? engaged : hovered;

  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", wrapperClassName)}
      {...(engaged === undefined
        ? {
            onMouseEnter: () => setHovered(true),
            onMouseLeave: () => setHovered(false),
          }
        : {})}
    >
      <MorphIcon
        icon={active ? iconActive : icon}
        size={size}
        strokeWidth={strokeWidth}
        spring="snappy"
        className={className}
      />
    </span>
  );
}

export default function DashboardProyectos() {
  const router = useRouter();
  const { effectiveRole } = useUserContext();
  const isAdmin = ["super", "admin"].includes(effectiveRole);

  useEffect(() => {
    if (!["super", "admin", "proyectos"].includes(effectiveRole)) {
      router.replace("/kore");
    }
  }, [effectiveRole, router]);

  const [chartTab, setChartTab] = useState<"MES" | "AÑO" | "RANGO">("MES");
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [tempYear, setTempYear] = useState<number>(new Date().getFullYear());

  const [showYearPicker, setShowYearPicker] = useState(false);

  const commitRangeStart = useCallback(
    (iso: string) => {
      if (iso > dateRange.end) {
        setDateRange({ start: iso, end: iso });
      } else {
        setDateRange((prev) => ({ ...prev, start: iso }));
      }
    },
    [dateRange.end],
  );

  const commitRangeEnd = useCallback(
    (iso: string) => {
      if (iso < dateRange.start) {
        setDateRange({ start: iso, end: iso });
      } else {
        setDateRange((prev) => ({ ...prev, end: iso }));
      }
    },
    [dateRange.start],
  );

  const { data: proyectos = [], isLoading: loading, refetch } = useProyectos();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<ProyectoSort>("newest");
  const [qrProyecto, setQrProyecto] = useState<Proyecto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<15 | 30 | 45 | "all">(15);
  const [mantenimientoHovered, setMantenimientoHovered] = useState(false);
  const [nuevoHovered, setNuevoHovered] = useState(false);
  const [exportHovered, setExportHovered] = useState(false);
  const [sortHovered, setSortHovered] = useState(false);
  const [searchHovered, setSearchHovered] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [ingresoHeaderHovered, setIngresoHeaderHovered] = useState(false);
  const [estadoChartHovered, setEstadoChartHovered] = useState(false);
  const [selectedEstadoSegment, setSelectedEstadoSegment] = useState<{
    name: string;
    value: number;
    mant: number;
    color: string;
  } | null>(null);
  const [hoveredEstadoSegment, setHoveredEstadoSegment] = useState<{
    name: string;
    value: number;
    mant: number;
    color: string;
  } | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, sortBy]);

  useEffect(() => {
    if (qrProyecto && proyectos.length > 0) {
      const updated = proyectos.find((p: Proyecto) => p.id === qrProyecto.id);
      if (updated) {
        setQrProyecto(updated);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proyectos, qrProyecto?.id]);

  // Load Lordicon script
  useEffect(() => {
    if (!document.querySelector('script[src="https://cdn.lordicon.com/lordicon.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.lordicon.com/lordicon.js';
      document.head.appendChild(script);
    }
  }, []);

  const exportarPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const now = new Date();
    const fechaReporte = now.toLocaleDateString("es-GT", { day: "2-digit", month: "long", year: "numeric" });

    // ── Top border strip ──
    doc.setFillColor(183, 73, 78);
    doc.rect(0, 0, pageW, 4, "F");

    // ── Fondo header (Light) ──
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 4, pageW, 34, "F");

    // ── Título KORE ──
    doc.setTextColor(183, 73, 78);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("KORE", 14, 16);

    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("SISTEMA INTEGRAL DE GESTIÓN", 14, 22);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("REPORTE DE PROYECTOS", 14, 32);

    // ── Fecha ──
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Generado: ${fechaReporte}`, pageW - 14, 32, { align: "right" });

    // ── Tarjetas resumen ──
    const totalComisiones = proyectos.reduce((acc, p) => {
      const precio = Number(p.precio) || 0;
      return acc + (p.aplica_vendedor ? precio * (Number(p.porcentaje_vendedor) || 0) / 100 : 0);
    }, 0);
    const totalIva = proyectos.reduce((acc, p) => {
      const precio = Number(p.precio) || 0;
      return acc + (p.aplica_iva ? precio * (Number(p.porcentaje_iva) || 0) / 100 : 0);
    }, 0);

    const cards = [
      { label: "TOTAL PROYECTOS", value: String(summary.count), color: [183, 73, 78] as [number, number, number] },
      { label: "INGRESOS TOTALES", value: `Q${summary.totalPrecio.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: [71, 85, 105] as [number, number, number] },
      { label: "COMISIONES", value: `Q${totalComisiones.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: [71, 85, 105] as [number, number, number] },
      { label: "IVA TOTAL", value: `Q${totalIva.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: [71, 85, 105] as [number, number, number] },
      { label: "MANT. MENSUAL", value: `Q${summary.totalMantenimiento.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: [183, 73, 78] as [number, number, number] },
    ];

    const cardW = (pageW - 28 - (cards.length - 1) * 4) / cards.length;
    cards.forEach((card, i) => {
      const x = 14 + i * (cardW + 4);
      const y = 44;
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, cardW, 22, 3, 3, "F");
      doc.setDrawColor(...card.color);
      doc.setLineWidth(0.3);
      doc.roundedRect(x, y, cardW, 22, 3, 3, "S");
      doc.setTextColor(...card.color);
      doc.setFontSize(6);
      doc.setFont("helvetica", "bold");
      doc.text(card.label, x + cardW / 2, y + 7, { align: "center" });
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(10);
      doc.text(card.value, x + cardW / 2, y + 16, { align: "center" });
    });

    // ── Tabla ──
    const tableRows = filteredProyectos.map((p) => {
      const precio = Number(p.precio) || 0;
      const comision = p.aplica_vendedor ? precio * (Number(p.porcentaje_vendedor) || 0) / 100 : 0;
      const desarrollo = p.aplica_desarrollo ? precio * (Number(p.porcentaje_desarrollo) || 0) / 100 : 0;
      const iva = p.aplica_iva ? precio * (Number(p.porcentaje_iva) || 0) / 100 : 0;
      const docPct = p.aplica_doc ? precio * (Number(p.porcentaje_doc) || 0) / 100 : 0;
      const restante = precio - comision - desarrollo - iva - docPct;
      const code = p.id.replace(/-/g, "").slice(0, 6).toUpperCase();
      const shortCode = code.slice(0, 3) + "-" + code.slice(3, 6);
      return [
        shortCode,
        p.nombre || "",
        p.cliente_nombre || "N/A",
        p.vendedor_nombre || "N/A",
        p.desarrollador_nombre || "N/A",
        normalizeEstadoProyecto(p.estado),
        `Q${precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
        comision > 0 ? `Q${comision.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—",
        desarrollo > 0 ? `Q${desarrollo.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—",
        iva > 0 ? `Q${iva.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "—",
        `Q${restante.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      ];
    });

    autoTable(doc, {
      startY: 72,
      head: [["Código", "Proyecto", "Cliente", "Vendedor", "Dev", "Estado", "Precio", "Comisión", "Desarrollo", "IVA", "Saldo Final"]],
      body: tableRows,
      theme: "grid",
      styles: {
        fontSize: 7,
        cellPadding: 3,
        textColor: [51, 65, 85],
        fillColor: [255, 255, 255],
        lineColor: [226, 232, 240],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [183, 73, 78],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 7,
        halign: "center",
      },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      columnStyles: {
        0: { halign: "center", fontStyle: "bold", textColor: [183, 73, 78] },
        5: { halign: "center" },
        6: { halign: "right" },
        7: { halign: "right" },
        8: { halign: "right" },
        9: { halign: "right" },
        10: { halign: "right" },
        11: { halign: "right", fontStyle: "bold", textColor: [183, 73, 78] },
      },
      didDrawPage: (data) => {
        const pageH = doc.internal.pageSize.getHeight();
        doc.setFillColor(248, 250, 252);
        doc.rect(0, pageH - 10, pageW, 10, "F");
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.1);
        doc.line(0, pageH - 10, pageW, pageH - 10);
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(6);
        doc.text(`© ${now.getFullYear()} Kore — Reporte generado el ${fechaReporte}`, 14, pageH - 3);
        doc.text(`Pág. ${data.pageNumber}`, pageW - 14, pageH - 3, { align: "right" });
      },
    });

    doc.save(`kore-proyectos-${now.toISOString().split("T")[0]}.pdf`);
  };

  // --- DERIVED DATA ---
  const summary = useMemo(() => {
    let totalPrecio = 0;
    let totalIva = 0;
    let totalComisiones = 0;
    let totalMantenimiento = 0;

    proyectos.forEach(p => {
      const precio = Number(p.precio) || 0;
      totalPrecio += precio;
      if (p.aplica_iva) totalIva += precio * (Number(p.porcentaje_iva) || 0) / 100;
      if (p.aplica_vendedor) totalComisiones += precio * (Number(p.porcentaje_vendedor) || 0) / 100;
      totalMantenimiento += Number(p.mantenimiento) || 0;
    });

    return { totalPrecio, totalIva, totalComisiones, totalMantenimiento, count: proyectos.length };
  }, [proyectos]);

  const pieLegendItems = useMemo(() => {
    const counts = {
      "En progreso": { count: 0, mant: 0 },
      Activo: { count: 0, mant: 0 },
      "En pausa": { count: 0, mant: 0 },
    };

    proyectos.forEach((p) => {
      const estado = normalizeEstadoProyecto(p.estado);
      counts[estado].count += 1;
      counts[estado].mant += Number(p.mantenimiento) || 0;
    });

    return ESTADOS_PROYECTO.map((name) => ({
      name,
      value: counts[name].count,
      mant: counts[name].mant,
      color: ESTADO_PROYECTO_CHART_COLOR[name],
    }));
  }, [proyectos]);

  const pieChartSegments = useMemo(
    () => pieLegendItems.filter((item) => item.value > 0),
    [pieLegendItems],
  );

  const pieHasMultipleSegments = pieChartSegments.length > 1;

  const activeEstadoSegment = hoveredEstadoSegment ?? selectedEstadoSegment;

  const activeEstadoPieIndex =
    activeEstadoSegment && activeEstadoSegment.value > 0
      ? pieChartSegments.findIndex((item) => item.name === activeEstadoSegment.name)
      : -1;

  const renderEstadoPieSector = useCallback(
    (props: EstadoPieSectorProps) => (
      <EstadoPieSector
        {...props}
        activeIndex={activeEstadoPieIndex}
        cornerRadius={pieHasMultipleSegments ? 6 : 0}
      />
    ),
    [activeEstadoPieIndex, pieHasMultipleSegments],
  );

  const barData = useMemo(() => {
    const now = new Date();

    if (chartTab === "RANGO") {
      const start = new Date(dateRange.start + "T00:00:00");
      const end = new Date(dateRange.end + "T23:59:59");
      const data: { name: string; dateStr?: string; precio: number; comision: number; iva: number; sortKey?: number }[] = [];

      // Creamos un mapa para agrupar
      const diffDays = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays <= 45) {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          data.push({ name: d.getDate().toString(), dateStr: d.toISOString().split('T')[0], precio: 0, comision: 0, iva: 0 });
        }
        proyectos.forEach(p => {
          const pDate = new Date(p.created_at);
          if (pDate >= start && pDate <= end) {
            const s = pDate.toISOString().split('T')[0];
            const item = data.find(i => i.dateStr === s);
            if (item) {
              const precio = Number(p.precio) || 0;
              item.precio += precio;
              if (p.aplica_vendedor) item.comision += precio * (Number(p.porcentaje_vendedor) || 0) / 100;
              if (p.aplica_iva) item.iva += precio * (Number(p.porcentaje_iva) || 0) / 100;
            }
          }
        });
      } else {
        const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        // Agrupación por mes si el rango es largo
        proyectos.forEach(p => {
          const pDate = new Date(p.created_at);
          if (pDate >= start && pDate <= end) {
            const mName = months[pDate.getMonth()] + " " + pDate.getFullYear().toString().slice(2);
            let item = data.find(i => i.name === mName);
            if (!item) {
              item = { name: mName, precio: 0, comision: 0, iva: 0, sortKey: pDate.getFullYear() * 100 + pDate.getMonth() };
              data.push(item);
            }
            const precio = Number(p.precio) || 0;
            item.precio += precio;
            if (p.aplica_vendedor) item.comision += precio * (Number(p.porcentaje_vendedor) || 0) / 100;
            if (p.aplica_iva) item.iva += precio * (Number(p.porcentaje_iva) || 0) / 100;
          }
        });
        data.sort((a, b) => (a.sortKey ?? 0) - (b.sortKey ?? 0));
      }
      return data;
    }

    if (chartTab === "MES") {
      const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      const dataByDay = Array.from({ length: daysInMonth }, (_, i) => ({
        name: (i + 1).toString(),
        precio: 0,
        comision: 0,
        iva: 0
      }));

      proyectos.forEach(p => {
        const date = new Date(p.created_at);
        if (date.getFullYear() === selectedYear && date.getMonth() === selectedMonth) {
          const d = date.getDate() - 1;
          const precio = Number(p.precio) || 0;
          dataByDay[d].precio += precio;
          if (p.aplica_vendedor) dataByDay[d].comision += precio * (Number(p.porcentaje_vendedor) || 0) / 100;
          if (p.aplica_iva) dataByDay[d].iva += precio * (Number(p.porcentaje_iva) || 0) / 100;
        }
      });

      const isCurrentMonth = selectedYear === now.getFullYear() && selectedMonth === now.getMonth();
      return dataByDay.filter(d => d.precio > 0 || !isCurrentMonth || Number(d.name) <= now.getDate());
    } else {
      const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const dataByMonth = Array.from({ length: 12 }, (_, i) => ({ name: months[i], precio: 0, comision: 0, iva: 0 }));

      proyectos.forEach(p => {
        const date = new Date(p.created_at);
        if (date.getFullYear() === selectedYear) {
          const m = date.getMonth();
          const precio = Number(p.precio) || 0;
          dataByMonth[m].precio += precio;
          if (p.aplica_vendedor) dataByMonth[m].comision += precio * (Number(p.porcentaje_vendedor) || 0) / 100;
          if (p.aplica_iva) dataByMonth[m].iva += precio * (Number(p.porcentaje_iva) || 0) / 100;
        }
      });

      const isCurrentYear = selectedYear === now.getFullYear();
      if (isCurrentYear) {
        return dataByMonth.slice(0, Math.min(12, now.getMonth() + 2)).filter(d => d.precio > 0 || d.name === months[now.getMonth()]);
      } else {
        return dataByMonth;
      }
    }
  }, [proyectos, chartTab, dateRange, selectedMonth, selectedYear]);

  const chartBarData = useMemo<IngresoBarPoint[]>(
    () =>
      barData.map((item) => ({
        ...item,
        neto: Math.max(0, item.precio - item.comision - item.iva),
      })),
    [barData],
  );

  const filteredProyectos = useMemo(() => {
    let result = [...proyectos];
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.nombre?.toLowerCase().includes(lower) ||
        p.cliente_nombre?.toLowerCase().includes(lower) ||
        p.vendedor_nombre?.toLowerCase().includes(lower)
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy === "alphabetical") {
        return (a.nombre || "").localeCompare(b.nombre || "", "es");
      }
      if (sortBy === "alphabetical-desc") {
        return (b.nombre || "").localeCompare(a.nombre || "", "es");
      }
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [proyectos, searchTerm, sortBy]);

  const resolvedItemsPerPage = useMemo(
    () => (itemsPerPage === "all" ? Math.max(filteredProyectos.length, 1) : itemsPerPage),
    [filteredProyectos.length, itemsPerPage],
  );

  const totalPages = useMemo(() => {
    return Math.ceil(filteredProyectos.length / resolvedItemsPerPage) || 1;
  }, [filteredProyectos, resolvedItemsPerPage]);

  const paginatedProyectos = useMemo(() => {
    const startIndex = (currentPage - 1) * resolvedItemsPerPage;
    return filteredProyectos.slice(startIndex, startIndex + resolvedItemsPerPage);
  }, [filteredProyectos, currentPage, resolvedItemsPerPage]);

  const emptyRowsCount = useMemo(() => {
    if (itemsPerPage === "all") return 0;
    return resolvedItemsPerPage - paginatedProyectos.length;
  }, [paginatedProyectos, resolvedItemsPerPage, itemsPerPage]);

  // Proyectos con fecha de entrega para la vista de usuarios normales
  const proyectosConFecha = useMemo(() => {
    return proyectos
      .filter((p): p is Proyecto & { fecha_entrega: string } => Boolean(p.fecha_entrega))
      .sort((a, b) => new Date(a.fecha_entrega).getTime() - new Date(b.fecha_entrega).getTime());
  }, [proyectos]);

  // Genera código corto: primeros 6 chars del UUID con guion en medio → "a1b-2c3"
  const getCode = (id: string) => {
    const clean = id.replace(/-/g, "").slice(0, 6).toUpperCase();
    return clean.slice(0, 3) + "-" + clean.slice(3, 6);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("es-GT", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr + "T00:00:00");
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const hasPendingMaintenance = useMemo(() => {
    return proyectos?.some(p => {
      if (!p.mantenimiento_activo || !p.mantenimiento_fecha_cobro) return false;
      const days = getDaysUntil(p.mantenimiento_fecha_cobro.split("T")[0]);
      return days <= 0;
    }) || false;
  }, [proyectos]);

  const activeSortIndex = PROYECTO_SORT_OPTIONS.findIndex((option) => option.value === sortBy);
  const activeSort =
    PROYECTO_SORT_OPTIONS[activeSortIndex >= 0 ? activeSortIndex : 0];
  const nextSort =
    PROYECTO_SORT_OPTIONS[(activeSortIndex + 1 + PROYECTO_SORT_OPTIONS.length) % PROYECTO_SORT_OPTIONS.length];

  const cycleSort = () => {
    setSortBy(nextSort.value);
  };

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-4 px-2 pb-8 pt-4 text-foreground sm:gap-6 md:px-6 md:pt-6">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-celeste-kore/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-azul-kore/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="mt-0.5 text-xl font-black leading-none tracking-tight sm:mt-1 sm:text-4xl">
            GESTIÓN DE <span className="text-celeste-kore">PROYECTOS</span>
          </h1>
        </div>
      </div>

      {/* ========== ADMIN VIEW: Summary Cards + Charts + Full Table ========== */}
      {isAdmin && (
        <>
          {/* TABLE SECTION - Admin only (Rendered FIRST) */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-900/90 backdrop-blur-xl shadow-none dark:shadow-2xl dark:shadow-black/20">
            <div className="px-5 py-3.5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-base font-black uppercase leading-none tracking-wider text-celeste-kore sm:text-xl">
                    Lista de Proyectos
                  </h3>
                  <p className="text-[11px] font-bold leading-none whitespace-nowrap text-white">
                    Total: {filteredProyectos.length}
                  </p>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">
                  <button
                    type="button"
                    onClick={exportarPDF}
                    onMouseEnter={() => setExportHovered(true)}
                    onMouseLeave={() => setExportHovered(false)}
                    className={`min-w-0 ${PROYECTOS_ACTION_BTN_CLASS}`}
                  >
                    <span className="truncate">EXPORTAR PDF</span>
                    <DashboardMorphIcon
                      icon={Download}
                      iconActive={FileDown}
                      size={16}
                      className="text-white"
                      engaged={exportHovered}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/kore/proyectos/mantenimiento")}
                    onMouseEnter={() => setMantenimientoHovered(true)}
                    onMouseLeave={() => setMantenimientoHovered(false)}
                    className={`relative min-w-0 ${PROYECTOS_ACTION_BTN_CLASS}`}
                  >
                    <span className="truncate">MANTENIMIENTO</span>
                    <DashboardMorphIcon
                      icon={Wrench}
                      iconActive={Hammer}
                      size={16}
                      className="text-white"
                      engaged={mantenimientoHovered}
                    />
                    {hasPendingMaintenance ? (
                      <span className="absolute -top-1 -right-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-background bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                    ) : null}
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div
                  className="relative min-w-0 flex-1"
                  onMouseEnter={() => setSearchHovered(true)}
                  onMouseLeave={() => setSearchHovered(false)}
                >
                  <DashboardMorphIcon
                    icon={Search}
                    iconActive={ScanSearch}
                    size={16}
                    className="text-muted-foreground"
                    wrapperClassName="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                    engaged={searchHovered}
                  />
                  <input
                    type="text"
                    placeholder="Buscar por proyecto o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-100 pl-10 pr-4 text-sm text-foreground transition-all placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-celeste-kore/40 dark:border-zinc-700 dark:bg-zinc-800/80"
                  />
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">
                  <button
                    type="button"
                    onClick={() => router.push("/kore/proyectos/nuevo")}
                    onMouseEnter={() => setNuevoHovered(true)}
                    onMouseLeave={() => setNuevoHovered(false)}
                    className={`flex-1 sm:flex-none ${PROYECTOS_ACTION_BTN_CLASS}`}
                  >
                    <span>NUEVO</span>
                    <DashboardMorphIcon
                      icon={Plus}
                      iconActive={CirclePlus}
                      size={16}
                      className="text-white"
                      engaged={nuevoHovered}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={cycleSort}
                    onMouseEnter={() => setSortHovered(true)}
                    onMouseLeave={() => setSortHovered(false)}
                    title={sortHovered ? nextSort.label : activeSort.label}
                    aria-label={sortHovered ? `Siguiente: ${nextSort.label}` : activeSort.label}
                    className={cn(
                      "flex shrink-0 cursor-pointer flex-col items-center justify-center gap-0 bg-transparent py-0.5",
                      PROYECTO_SORT_CONTROL_WIDTH_CLASS,
                    )}
                  >
                    <MorphIcon
                      icon={sortHovered ? nextSort.icon : activeSort.icon}
                      size={28}
                      strokeWidth={2.25}
                      spring="snappy"
                      className="text-celeste-kore sm:h-8 sm:w-8"
                    />
                    <span className="block w-full text-center text-[7px] font-bold uppercase leading-none tracking-tight text-celeste-kore/80 sm:text-[8px]">
                      {sortHovered ? nextSort.shortLabel : activeSort.shortLabel}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4 py-8 px-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProyectos.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground border-t border-zinc-200 dark:border-zinc-700/80">
                <p className="text-sm">No se encontraron proyectos.</p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto border-t border-zinc-200 dark:border-zinc-700/80 lg:block">
                    <table className="w-full table-fixed border-collapse text-left text-xs">
                      <colgroup>
                        <col className="w-[8%]" />
                        <col className="w-[16%]" />
                        <col className="w-[18%]" />
                        <col className="w-[10%]" />
                        <col className="w-[10%]" />
                        <col className="w-[10%]" />
                        <col className="w-[10%]" />
                        <col className="w-[8%]" />
                      </colgroup>
                      <thead className="bg-zinc-200/70 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700/80">
                        <tr className="text-[9px] text-celeste-kore uppercase tracking-widest">
                          <th className="whitespace-nowrap px-3 py-3 font-black">Código</th>
                          <th className="whitespace-nowrap px-3 py-3 font-black">Proyecto</th>
                          <th className="whitespace-nowrap px-3 py-3 font-black">Cliente</th>
                          <th className="whitespace-nowrap px-3 py-3 font-black">Creación</th>
                          <th className="whitespace-nowrap px-3 py-3 font-black">Entrega</th>
                          <th className="whitespace-nowrap px-3 py-3 text-center font-black">Estado</th>
                          <th className="whitespace-nowrap px-3 py-3 text-right font-black">Precio</th>
                          <th className="whitespace-nowrap px-3 py-3 text-right font-black" aria-label="Acción" />
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedProyectos.map((p, rowIdx) => {
                          const precio = Number(p.precio) || 0;
                          const rowEngaged = hoveredRowId === p.id;
                          const rowBg =
                            rowIdx % 2 === 1
                              ? "bg-zinc-100/40 dark:bg-zinc-800/25"
                              : "bg-zinc-50 dark:bg-zinc-900";
                          const rowHoverBg = "group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800/60";
                          const cellBg = `${rowBg} ${rowHoverBg}`;

                          return (
                            <tr
                              key={p.id}
                              onMouseEnter={() => setHoveredRowId(p.id)}
                              onMouseLeave={() => setHoveredRowId(null)}
                              onClick={() => {
                                sessionStorage.setItem("selectedProyectoId", p.id);
                                router.push(getProyectoVerPath(p));
                              }}
                              className={`group border-b border-zinc-200/80 dark:border-zinc-700/50 last:border-0 cursor-pointer transition-colors ${cellBg}`}
                            >
                              <td className={`whitespace-nowrap px-3 py-3 font-mono text-[10px] ${cellBg}`}>
                                <span className={cn("font-black", ROW_ACCENT_CLASS)}>{getCode(p.id)}</span>
                              </td>
                              <td className={`min-w-0 px-3 py-3 ${cellBg}`}>
                                <p className={cn("truncate font-semibold", ROW_HOVER_TEXT_CLASS)}>{p.nombre}</p>
                              </td>
                              <td className={`min-w-0 px-3 py-3 ${cellBg}`}>
                                <p className={cn("truncate font-semibold", ROW_ACCENT_CLASS)}>
                                  {p.cliente_nombre || "Sin cliente"}
                                </p>
                              </td>
                              <td className={`whitespace-nowrap px-3 py-3 ${cellBg}`}>
                                <ProyectoTableFecha dateStr={p.created_at} />
                              </td>
                              <td className={`whitespace-nowrap px-3 py-3 ${cellBg}`}>
                                <ProyectoTableFecha dateStr={p.fecha_entrega} />
                              </td>
                              <td className={`px-3 py-3 text-center ${cellBg}`}>
                                <span
                                  className={cn(
                                    ESTADO_TABLE_BADGE_CLASS,
                                    getEstadoProyectoBadgeClass(p.estado),
                                    "group-hover:border-celeste-kore/25 group-hover:bg-celeste-kore/10 group-hover:text-celeste-kore",
                                  )}
                                >
                                  {normalizeEstadoProyecto(p.estado)}
                                </span>
                              </td>
                              <td className={`whitespace-nowrap px-3 py-3 text-right ${cellBg}`}>
                                <p className={cn("font-black", ROW_HOVER_TEXT_CLASS)}>
                                  <span className={ROW_ACCENT_CLASS}>Q </span>
                                  {precio.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </p>
                              </td>
                              <td className={`whitespace-nowrap px-3 py-3 text-right ${cellBg}`}>
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] transition-transform duration-300",
                                    ROW_ACCENT_CLASS,
                                    rowEngaged ? "translate-x-1" : "",
                                  )}
                                >
                                  Entrar
                                  <DashboardMorphIcon
                                    icon={MoveRight}
                                    iconActive={ArrowUpRight}
                                    size={14}
                                    strokeWidth={2.5}
                                    className={ROW_ACCENT_CLASS}
                                    engaged={rowEngaged}
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                        {emptyRowsCount > 0 && Array.from({ length: emptyRowsCount }).map((_, idx) => {
                          const emptyRowBg =
                            (paginatedProyectos.length + idx) % 2 === 1
                              ? "bg-zinc-100/40 dark:bg-zinc-800/25"
                              : "bg-zinc-50 dark:bg-zinc-900";

                          return (
                            <tr key={`empty-${idx}`} className="opacity-0 pointer-events-none select-none">
                              <td className={`whitespace-nowrap px-3 py-3 ${emptyRowBg}`}>
                                <span>&nbsp;</span>
                              </td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                              <td className={`px-3 py-3 ${emptyRowBg}`}><span>&nbsp;</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                <div className="grid grid-cols-1 gap-3 border-t border-zinc-200 p-5 dark:border-zinc-700/80 lg:hidden">
                    {paginatedProyectos.map((p) => (
                      <div
                        key={p.id}
                        className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/60 p-3 flex flex-col gap-2 hover:border-celeste-kore/40 transition-all cursor-pointer group"
                        onClick={() => {
                          sessionStorage.setItem('selectedProyectoId', p.id);
                          router.push(getProyectoVerPath(p));
                        }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-foreground group-hover:text-celeste-kore transition-colors line-clamp-2">{p.nombre}</h4>
                          <span className="font-bold text-[10px] font-mono text-celeste-kore bg-celeste-kore/10 px-1.5 py-0.5 rounded border border-celeste-kore/20 shrink-0">{getCode(p.id)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Cliente: <span className="font-semibold text-foreground">{p.cliente_nombre || 'Sin cliente'}</span>
                        </p>
                        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${getEstadoProyectoBadgeClass(p.estado)}`}>
                            {normalizeEstadoProyecto(p.estado)}
                          </span>
                          <span className="text-xs font-black text-celeste-kore">Q{Number(p.precio || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                <div className="flex items-center justify-center gap-2 border-t border-zinc-200 bg-zinc-100/60 px-5 py-2 dark:border-zinc-700/80 dark:bg-zinc-800/40">
                    <button
                      type="button"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className="cursor-pointer p-1 text-muted-foreground transition-colors hover:text-celeste-kore disabled:pointer-events-none disabled:opacity-30"
                    >
                      <DashboardMorphIcon icon={ChevronLeft} iconActive={ArrowLeft} size={18} className="text-current" />
                    </button>
                    <span className="min-w-10 select-none text-center text-sm font-medium text-foreground">
                      {currentPage}/{totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      className="cursor-pointer p-1 text-muted-foreground transition-colors hover:text-celeste-kore disabled:pointer-events-none disabled:opacity-30"
                    >
                      <DashboardMorphIcon icon={ChevronRight} iconActive={ArrowRight} size={18} className="text-current" />
                    </button>
                    <select
                      value={itemsPerPage === "all" ? "all" : String(itemsPerPage)}
                      onChange={(event) => {
                        const val = event.target.value;
                        if (val === "all") setItemsPerPage("all");
                        else setItemsPerPage(Number(val) as 15 | 30 | 45);
                      }}
                      aria-label="Proyectos por página"
                      className="h-8 min-w-14 cursor-pointer rounded-lg border border-zinc-300 bg-white px-2 text-center text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-celeste-kore/40 dark:border-zinc-600 dark:bg-zinc-800"
                    >
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                      <option value="all">Todos</option>
                    </select>
                </div>
              </>
            )}
          </div>

          {/* CHARTS SECTION */}
          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:items-stretch">
            {/* Donut Chart */}
            <div
              className="flex h-full min-w-0 flex-col rounded-2xl border border-celeste-kore/55 dark:border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-none dark:shadow-2xl dark:shadow-black/20"
              onMouseEnter={() => setEstadoChartHovered(true)}
              onMouseLeave={() => setEstadoChartHovered(false)}
            >
              <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                <DashboardMorphIcon
                  icon={FolderKanban}
                  iconActive={LucidePieChart}
                  size={22}
                  strokeWidth={2}
                  className="shrink-0 text-celeste-kore"
                  engaged={estadoChartHovered}
                />
                <h3 className="text-xs font-black uppercase tracking-widest sm:text-sm">Estado de Proyectos</h3>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-4">
                <div className="relative mx-auto aspect-square w-full max-w-full">
                  {summary.count > 0 && pieChartSegments.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartSegments}
                            innerRadius="64%"
                            outerRadius="90%"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={pieHasMultipleSegments ? 2 : 0}
                            dataKey="value"
                            stroke="none"
                            isAnimationActive={false}
                            shape={renderEstadoPieSector}
                            onMouseEnter={(_: unknown, index: number) =>
                              setHoveredEstadoSegment(pieChartSegments[index] ?? null)
                            }
                            onMouseLeave={() => setHoveredEstadoSegment(null)}
                          >
                            {pieChartSegments.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <motion.div
                        layout
                        transition={{ layout: ESTADO_PIE_MOTION }}
                        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          {activeEstadoSegment ? (
                            <motion.div
                              key={activeEstadoSegment.name}
                              layout
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{
                                ...ESTADO_PIE_MOTION,
                                layout: ESTADO_PIE_MOTION,
                              }}
                              className="mb-1.5 flex flex-col items-center gap-0.5"
                            >
                              <span className="max-w-[7rem] truncate text-[9px] font-black uppercase tracking-wider text-muted-foreground sm:max-w-[9rem]">
                                {activeEstadoSegment.name}
                              </span>
                              <div className="flex items-center justify-center gap-1.5">
                                <span
                                  className="text-sm font-black sm:text-base"
                                  style={{ color: activeEstadoSegment.color }}
                                >
                                  {activeEstadoSegment.value}
                                </span>
                                <span
                                  aria-hidden
                                  className="size-1 shrink-0 rounded-full bg-muted-foreground/55"
                                />
                                <span className="text-sm font-black text-white sm:text-base">
                                  {summary.count > 0
                                    ? Math.round(
                                        (activeEstadoSegment.value / summary.count) * 100,
                                      )
                                    : 0}
                                  %
                                </span>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                        <motion.span
                          layout
                          transition={{ layout: ESTADO_PIE_MOTION }}
                          className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground sm:text-xs"
                        >
                          Total
                        </motion.span>
                        <motion.span
                          layout
                          transition={{ layout: ESTADO_PIE_MOTION }}
                          className="text-3xl font-black leading-none text-foreground sm:text-4xl"
                        >
                          {summary.count}
                        </motion.span>
                      </motion.div>
                    </>
                  ) : (
                    <div className="flex h-full min-h-[180px] w-full items-center justify-center text-xs text-muted-foreground sm:text-sm">
                      {summary.count > 0 ? null : "No hay proyectos"}
                    </div>
                  )}
                </div>

                <div className="flex w-full min-w-0 flex-col gap-2 border-t border-border/20 pt-3 sm:gap-2.5 sm:pt-4">
                  {pieLegendItems.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setSelectedEstadoSegment((prev) =>
                          prev?.name === item.name ? null : item,
                        )
                      }
                      onMouseEnter={() => setHoveredEstadoSegment(item)}
                      onMouseLeave={() => setHoveredEstadoSegment(null)}
                      className={cn(
                        "flex min-w-0 w-full items-center justify-between gap-3 rounded-xl bg-muted/20 px-3.5 py-2.5 text-left transition-all duration-300 cursor-pointer sm:px-4",
                        activeEstadoSegment?.name === item.name &&
                          "font-black shadow-sm",
                      )}
                      style={
                        activeEstadoSegment?.name === item.name
                          ? {
                              backgroundColor: `color-mix(in srgb, ${item.color} 18%, transparent)`,
                              boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${item.color} 42%, transparent)`,
                            }
                          : undefined
                      }
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <div
                          className="h-2 w-2 shrink-0 rounded-full sm:h-2.5 sm:w-2.5"
                          style={{
                            backgroundColor: item.color,
                            ...(activeEstadoSegment?.name === item.name
                              ? {
                                  boxShadow: `0 0 0 2px color-mix(in srgb, ${item.color} 40%, transparent)`,
                                }
                              : {}),
                          }}
                        />
                        <span
                          className={cn(
                            "truncate text-[11px] sm:text-xs",
                            activeEstadoSegment?.name === item.name
                              ? "font-black text-foreground"
                              : "font-semibold text-muted-foreground",
                          )}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                        {item.mant > 0 ? (
                          <span className="rounded border border-celeste-kore/20 bg-celeste-kore/10 px-1 py-0.5 text-[8px] font-black text-celeste-kore sm:text-[9px]">
                            Q{item.mant.toLocaleString()}
                          </span>
                        ) : null}
                        <span className="text-[10px] font-black sm:text-xs">
                          {item.value}{" "}
                          <span className="font-bold text-muted-foreground">
                            — {summary.count > 0 ? Math.round((item.value / summary.count) * 100) : 0}%
                          </span>
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div
              className="flex min-h-0 flex-col rounded-2xl border border-celeste-kore/55 dark:border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-4 sm:p-6 shadow-none dark:shadow-2xl dark:shadow-black/20 lg:h-full"
              onMouseEnter={() => setIngresoHeaderHovered(true)}
              onMouseLeave={() => setIngresoHeaderHovered(false)}
            >

              <div className="mb-4 flex shrink-0 min-w-0 flex-col gap-3 overflow-visible lg:gap-2">
                <div className="flex min-w-0 items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <DashboardMorphIcon
                      icon={CircleDollarSign}
                      iconActive={BarChart3}
                      size={22}
                      strokeWidth={2}
                      className="shrink-0 text-celeste-kore"
                      engaged={ingresoHeaderHovered}
                    />
                    <h3 className="whitespace-nowrap text-xs font-black uppercase tracking-widest text-foreground sm:text-sm">
                      Ingreso
                    </h3>
                  </div>

                  <div className="relative flex shrink-0 items-center rounded-full border border-border/30 bg-muted/30 p-1">
                    {(["MES", "AÑO", "RANGO"] as const).map((tab) => {
                      const isActive = chartTab === tab;
                      return (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setChartTab(tab)}
                          className="relative cursor-pointer rounded-full px-2.5 py-1 text-[8px] font-bold leading-none tracking-tight sm:px-3 sm:py-1.5 sm:text-[10px] sm:tracking-normal"
                        >
                          {isActive ? (
                            <motion.span
                              layoutId="ingreso-chart-tab-pill"
                              className="absolute inset-0 rounded-full bg-celeste-kore shadow-md"
                              transition={ESTADO_PIE_MOTION}
                            />
                          ) : null}
                          <span
                            className={cn(
                              "relative z-10 transition-colors duration-300",
                              isActive
                                ? "text-white"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {tab}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex w-full min-w-0 items-center justify-center overflow-visible lg:justify-end">
                  <AnimatePresence mode="wait" initial={false}>
                    {chartTab === "MES" && (
                      <motion.div
                        key="chart-filter-mes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={ESTADO_PIE_MOTION}
                        className="relative z-20 mx-auto min-w-0 w-full max-w-[220px] shrink overflow-visible sm:mx-0 sm:max-w-none sm:w-auto"
                      >
                      <div className="flex h-8 min-w-0 items-center overflow-hidden rounded-xl border border-border/40 bg-muted/20 transition-all sm:h-9">
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedMonth === 0) {
                              setSelectedMonth(11);
                              setSelectedYear((y) => y - 1);
                            } else {
                              setSelectedMonth((m) => m - 1);
                            }
                          }}
                          className="flex h-full shrink-0 cursor-pointer items-center justify-center border-r border-border/40 px-1 text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground sm:px-2"
                          title="Mes anterior"
                        >
                          <DashboardMorphIcon icon={ChevronLeft} iconActive={ArrowLeft} size={11} className="text-current sm:h-3.5 sm:w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTempYear(selectedYear);
                            setShowMonthPicker((open) => !open);
                          }}
                          className="filter-button flex h-full min-w-0 flex-1 cursor-pointer items-center justify-center gap-1 overflow-hidden px-1 font-black uppercase tracking-widest text-foreground transition-colors hover:bg-muted/30 sm:px-2"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                              key={`${selectedMonth}-${selectedYear}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="truncate text-[10px] sm:text-[11px]"
                            >
                              {`${monthsAbbr[selectedMonth].toUpperCase()} ${selectedYear}`}
                            </motion.span>
                          </AnimatePresence>
                          <DashboardMorphIcon
                            icon={ChevronDown}
                            iconActive={ChevronUp}
                            size={10}
                            className="text-muted-foreground"
                            engaged={showMonthPicker}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (selectedMonth === 11) {
                              setSelectedMonth(0);
                              setSelectedYear((y) => y + 1);
                            } else {
                              setSelectedMonth((m) => m + 1);
                            }
                          }}
                          className="flex h-full shrink-0 cursor-pointer items-center justify-center border-l border-border/40 px-1 text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground sm:px-2"
                          title="Siguiente mes"
                        >
                          <DashboardMorphIcon icon={ChevronRight} iconActive={ArrowRight} size={11} className="text-current sm:h-3.5 sm:w-3.5" />
                        </button>
                      </div>

                      <AnimatePresence>
                        {showMonthPicker && (
                          <>
                            <motion.div
                              className="fixed inset-0 z-[190] bg-transparent"
                              onClick={() => setShowMonthPicker(false)}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            />
                            <motion.div
                              className="absolute top-full left-1/2 z-[200] mt-2 flex w-[240px] -translate-x-1/2 flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl lg:left-auto lg:right-0 lg:translate-x-0"
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => e.stopPropagation()}
                              initial={{ opacity: 0, scale: 0.92, y: -8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.92, y: -8 }}
                              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                              style={{ originX: 1, originY: 0 }}
                            >
                              <div className="flex items-center justify-between">
                                <button
                                  type="button"
                                  onClick={() => setTempYear((prev) => prev - 1)}
                                  className="cursor-pointer rounded-lg p-1 text-foreground transition-colors hover:bg-muted/50"
                                >
                                  <DashboardMorphIcon icon={ChevronLeft} iconActive={ArrowLeft} size={16} className="text-current" />
                                </button>
                                <AnimatePresence mode="wait" initial={false}>
                                  <motion.span
                                    key={tempYear}
                                    className="text-sm font-black text-foreground"
                                    initial={{ opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                  >
                                    {tempYear}
                                  </motion.span>
                                </AnimatePresence>
                                <button
                                  type="button"
                                  onClick={() => setTempYear((prev) => prev + 1)}
                                  className="cursor-pointer rounded-lg p-1 text-foreground transition-colors hover:bg-muted/50"
                                >
                                  <DashboardMorphIcon icon={ChevronRight} iconActive={ArrowRight} size={16} className="text-current" />
                                </button>
                              </div>

                              <div className="grid grid-cols-3 gap-2">
                                {monthsAbbr.map((m, idx) => {
                                  const isSelected = selectedMonth === idx && selectedYear === tempYear;
                                  return (
                                    <motion.button
                                      key={m}
                                      type="button"
                                      onClick={() => {
                                        setSelectedMonth(idx);
                                        setSelectedYear(tempYear);
                                        setShowMonthPicker(false);
                                      }}
                                      whileHover={{ scale: 1.08 }}
                                      whileTap={{ scale: 0.95 }}
                                      className={`cursor-pointer rounded-lg py-2 text-xs font-bold transition-all ${isSelected
                                          ? "bg-celeste-kore text-white shadow-md"
                                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        }`}
                                    >
                                      {m}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    )}

                    {chartTab === "AÑO" && (
                      <motion.div
                        key="chart-filter-anio"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={ESTADO_PIE_MOTION}
                        className="relative z-20 mx-auto shrink-0 overflow-visible lg:mx-0"
                      >
                    <button
                      type="button"
                      onClick={() => setShowYearPicker(!showYearPicker)}
                      className="filter-button h-8 sm:h-9 flex items-center justify-center gap-1.5 px-4 bg-muted/20 border border-border/40 rounded-xl font-black uppercase tracking-widest text-foreground hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <span>{selectedYear}</span>
                      <DashboardMorphIcon
                        icon={ChevronDown}
                        iconActive={ChevronUp}
                        size={10}
                        className="text-muted-foreground"
                        engaged={showYearPicker}
                      />
                    </button>

                    <AnimatePresence>
                      {showYearPicker && (
                        <>
                          <motion.div
                            className="fixed inset-0 z-40 bg-transparent"
                            onClick={() => setShowYearPicker(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                          <motion.div
                            className="absolute top-full mt-2 z-50 w-[140px] bg-card border border-border rounded-2xl shadow-xl p-3 flex flex-col gap-1.5"
                            initial={{ opacity: 0, scale: 0.92, y: -8, x: "-50%" }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, scale: 0.92, y: -8, x: "-50%" }}
                            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            style={{ left: "50%", originX: 0.5, originY: 0 }}
                          >
                            {[2024, 2025, 2026, 2027, 2028].map((y) => {
                              const isSelected = selectedYear === y;
                              return (
                                <motion.button
                                  key={y}
                                  type="button"
                                  onClick={() => {
                                    setSelectedYear(y);
                                    setShowYearPicker(false);
                                  }}
                                  whileHover={{ scale: 1.04, x: 2 }}
                                  whileTap={{ scale: 0.96 }}
                                  className={`w-full py-1.5 text-center text-xs font-black rounded-lg transition-all cursor-pointer ${isSelected
                                      ? "bg-celeste-kore text-white shadow-md"
                                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                    }`}
                                >
                                  {y}
                                </motion.button>
                              );
                            })}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                      </motion.div>
                    )}

                    {chartTab === "RANGO" && (
                      <motion.div
                        key="chart-filter-rango"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={ESTADO_PIE_MOTION}
                        className="mx-auto flex shrink-0 flex-wrap items-center justify-center gap-2 lg:mx-0 lg:justify-end"
                      >
                        <RangeDateSegmentInput
                          value={dateRange.start}
                          onCommit={commitRangeStart}
                          aria-label="Fecha inicio"
                        />
                        <span
                          aria-hidden
                          className="text-[10px] font-bold text-muted-foreground/70 sm:text-[11px]"
                        >
                          —
                        </span>
                        <RangeDateSegmentInput
                          value={dateRange.end}
                          onCommit={commitRangeEnd}
                          aria-label="Fecha fin"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mb-3 flex w-full shrink-0 flex-wrap items-center justify-center gap-4 sm:mb-4 sm:gap-5">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-sm sm:h-2.5 sm:w-2.5"
                    style={{ backgroundColor: INGRESO_BAR_PRECIO_COLOR }}
                  />
                  <span className="text-[9px] font-bold uppercase text-muted-foreground sm:text-[10px]">Precio total</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-sm sm:h-2.5 sm:w-2.5"
                    style={{ backgroundColor: INGRESO_BAR_COMISION_COLOR }}
                  />
                  <span className="text-[9px] font-bold uppercase text-muted-foreground sm:text-[10px]">Comisión</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-sm sm:h-2.5 sm:w-2.5"
                    style={{ backgroundColor: INGRESO_BAR_IVA_COLOR }}
                  />
                  <span className="text-[9px] font-bold uppercase text-muted-foreground sm:text-[10px]">IVA</span>
                </div>
              </div>

              <div className="min-h-[220px] w-full min-w-0 flex-1 overflow-hidden sm:min-h-[260px] lg:min-h-0">
                {chartBarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartBarData}
                      barGap={-INGRESO_BAR_SIZE}
                      margin={{ top: 10, right: 4, left: -18, bottom: 0 }}
                    >
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#71717a" }} dy={10} />
                      <YAxis
                        width={28}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 8, fill: "#71717a" }}
                        tickFormatter={(val) => {
                          if (val === 0) return "0";
                          const k = val / 1000;
                          return Number.isInteger(k) ? `${k}k` : `${k.toFixed(1)}k`;
                        }}
                      />
                      <RechartsTooltip
                        cursor={{ fill: "rgba(255,255,255,0.05)" }}
                        content={IngresoBarTooltip}
                      />
                      <Bar
                        dataKey="neto"
                        fill={INGRESO_BAR_PRECIO_COLOR}
                        barSize={INGRESO_BAR_SIZE}
                        shape={IngresoOverlayBarShape}
                      />
                      <Bar
                        dataKey="iva"
                        fill={INGRESO_BAR_IVA_COLOR}
                        barSize={INGRESO_BAR_SIZE}
                        shape={IngresoOverlayBarShape}
                      />
                      <Bar
                        dataKey="comision"
                        fill={INGRESO_BAR_COMISION_COLOR}
                        barSize={INGRESO_BAR_SIZE}
                        shape={IngresoOverlayBarShape}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                    No hay datos para mostrar
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ========== NORMAL USER VIEW: Only payment dates ========== */}
      {!isAdmin && (
        <div className="rounded-2xl border border-celeste-kore/30 dark:border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl p-6 shadow-none dark:shadow-2xl dark:shadow-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center border border-red-200 dark:border-red-900/30 shrink-0">
              <DashboardMorphIcon icon={CalendarDays} iconActive={Calendar} size={16} className="text-celeste-kore" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Fechas de Entrega</h3>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Próximas fechas de pago programadas</p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3 pt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <Skeleton className="h-10 w-10 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : proyectosConFecha.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground border-t border-border/30">
              <p className="text-sm">No hay fechas de entrega programadas.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {proyectosConFecha.map((p) => {
                const days = getDaysUntil(p.fecha_entrega);
                const isPast = days < 0;
                const isToday = days === 0;
                const isUrgent = days > 0 && days <= 7;

                return (
                  <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-celeste-kore/55 dark:border-white/10 bg-card/40 hover:bg-card/60 backdrop-blur-sm transition-all duration-300 shadow-none dark:shadow-sm">
                    <div className="flex items-center gap-4">
                      <code className="text-xs font-mono font-bold text-celeste-kore bg-celeste-kore/10 px-2 py-1 rounded border border-celeste-kore/20">{getCode(p.id)}</code>
                      <div>
                        <p className="font-bold text-sm text-foreground">{p.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">Cliente: {p.cliente_nombre || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-bold">{formatDate(p.fecha_entrega)}</p>
                        <p className={`text-[10px] font-bold ${isPast ? 'text-celeste-kore' :
                            isToday ? 'text-red-400' :
                              isUrgent ? 'text-azul-kore' :
                                'text-muted-foreground'
                          }`}>
                          {isPast ? `Vencido hace ${Math.abs(days)} días` :
                            isToday ? 'Hoy' :
                              `En ${days} días`}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${isPast ? 'bg-celeste-kore' :
                          isToday ? 'bg-red-400' :
                            isUrgent ? 'bg-azul-kore' :
                              'bg-celeste-kore'
                        }`} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}



      <QRProyecto
        isOpen={!!qrProyecto}
        proyecto={qrProyecto}
        onClose={() => setQrProyecto(null)}
        onSuccess={refetch}
      />
    </div>
  );
}


