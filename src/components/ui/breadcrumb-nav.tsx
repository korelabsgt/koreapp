"use client";

import { formatProyectoSegmentLabel } from "@/components/(Kore)/proyectos/lib/helpers";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronLeft } from "lucide";
import { ChevronRight } from "lucide-react";
import { MorphIcon } from "morphicons/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const SEGMENT_LABELS: Record<string, string> = {
  kore: "Kore",
  proyectos: "Proyectos",
  proyecto: "Proyectos",
  resumen: "Dashboard",
  nuevo: "Nuevo",
  editar: "Editar",
  ver: "Ver",
  qr: "QR",
  clientes: "Clientes",
  mantenimiento: "Mantenimiento",
  admin: "Administración",
  configuraciones: "Configuraciones",
  dispositivos: "Dispositivos de Acceso",
  usuarios: "Gestión de Usuarios",
  finanzas: "Finanzas",
};

function useBreadcrumbBackHref(pathname: string): string {
  const cleanPathname = pathname.replace(/\/$/, "");
  const isClientes = cleanPathname === "/kore/clientes";
  const rawSegments = pathname.split("/").filter((item) => item !== "");

  if (rawSegments.includes("qr")) {
    const detalleIdx = rawSegments.indexOf("ver");
    const id =
      detalleIdx >= 0 && detalleIdx + 1 < rawSegments.length
        ? rawSegments[detalleIdx + 1]
        : "";
    return id ? `/kore/proyectos/ver/${id}` : "/kore/proyectos";
  }
  if (rawSegments.includes("editar")) {
    const detalleIdx = rawSegments.indexOf("ver");
    const id =
      detalleIdx >= 0 && detalleIdx + 1 < rawSegments.length
        ? rawSegments[detalleIdx + 1]
        : "";
    return id ? `/kore/proyectos/ver/${id}` : "/kore/proyectos";
  }
  if (rawSegments.includes("ver")) {
    return "/kore/proyectos";
  }
  if (isClientes) {
    return "/kore";
  }
  if (rawSegments.length > 1) {
    return `/${rawSegments.slice(0, -1).join("/")}`;
  }
  return "/kore";
}

function getSegmentLabel(segment: string, index: number, rawSegments: string[]): string | null {
  if (segment === "kore") return null;
  if (segment === "ver") {
    const next = rawSegments[index + 1];
    if (next && next !== "editar" && next !== "qr" && !SEGMENT_LABELS[next]) {
      return null;
    }
  }
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  if (rawSegments[index - 1] === "ver" && segment !== "editar" && segment !== "qr") {
    return formatProyectoSegmentLabel(segment);
  }
  return null;
}

function useVisibleSegments(pathname: string) {
  const cleanPathname = pathname.replace(/\/$/, "");
  const isClientes = cleanPathname === "/kore/clientes";
  const rawSegments = pathname.split("/").filter((item) => item !== "");

  const segments = isClientes
    ? [{ segment: "clientes", label: "Clientes", href: "/kore/clientes" }]
    : rawSegments
        .map((segment, index) => {
          const label = getSegmentLabel(segment, index, rawSegments);
          if (!label) return null;

          const parts = rawSegments.slice(0, index + 1);
          let nextIdx = index + 1;
          while (
            nextIdx < rawSegments.length &&
            !SEGMENT_LABELS[rawSegments[nextIdx]]
          ) {
            parts.push(rawSegments[nextIdx]);
            nextIdx++;
          }
          const href = "/" + parts.join("/");

          return { segment, label, href };
        })
        .filter(
          (item): item is { segment: string; label: string; href: string } =>
            item !== null,
        );

  return segments;
}

export function BreadcrumbBackButton({ engaged = false }: { engaged?: boolean }) {
  const pathname = usePathname();
  const backHref = useBreadcrumbBackHref(pathname);

  return (
    <Link
      href={backHref}
      className="group flex shrink-0 cursor-pointer items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      title="Atrás"
    >
      <MorphIcon
        icon={engaged ? ChevronLeft : ArrowLeft}
        size={24}
        strokeWidth={2}
        spring="snappy"
        className={`transition-transform ${engaged ? "-translate-x-1" : "group-hover:-translate-x-1"}`}
      />
    </Link>
  );
}

export function BreadcrumbNav({ className }: { className?: string }) {
  const pathname = usePathname();

  if (pathname === "/kore") return null;

  const visibleSegments = useVisibleSegments(pathname);

  if (visibleSegments.length === 0) return null;

  return (
    <LayoutGroup id="breadcrumb">
      <motion.div
        layout
        className={`flex min-w-0 items-center gap-0.5 overflow-hidden pt-0 text-[9px] font-medium text-muted-foreground md:gap-1 md:text-base ${className ?? ""}`}
      >
        <div className="flex min-w-0 items-center gap-1 overflow-hidden mask-gradient">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleSegments.map((item, index) => {
              const isLast = index === visibleSegments.length - 1;

              return (
                <motion.div
                  layout="position"
                  key={item.href}
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.15 },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 25,
                    mass: 1,
                  }}
                  className="flex shrink-0 items-center gap-0.5 whitespace-nowrap md:gap-1"
                >
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground/40 md:size-5" />
                  <Link
                    href={item.href}
                    className={`truncate capitalize transition-colors hover:text-foreground ${
                      isLast
                        ? "pointer-events-none text-xs font-bold text-celeste-kore md:text-lg"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </LayoutGroup>
  );
}
