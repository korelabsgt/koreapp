import {
  ESTADOS_PROYECTO,
  normalizeEstadoProyecto,
  type EstadoProyecto,
  type Proyecto,
} from "@/components/(Kore)/proyectos/lib/zod";

export { ESTADOS_PROYECTO, normalizeEstadoProyecto };
export type { EstadoProyecto };

export const ESTADO_PROYECTO_CHART_COLOR: Record<EstadoProyecto, string> = {
  "En progreso": "#f59e0b",
  Activo: "#22c55e",
  "En pausa": "#B7494E",
};

export function getEstadoProyectoBadgeClass(estado: string): string {
  const normalized = normalizeEstadoProyecto(estado);
  if (normalized === "En progreso") {
    return "bg-amber-500/10 text-amber-600 border-amber-500/25 dark:text-amber-400";
  }
  if (normalized === "Activo") {
    return "bg-green-500/10 text-green-600 border-green-500/25 dark:text-green-400";
  }
  return "bg-celeste-kore/10 text-celeste-kore border-celeste-kore/20";
}

export function getProyectoCode(id: string): string {
  if (!id) return "";
  const clean = id.replace(/-/g, "").slice(0, 6).toUpperCase();
  return `${clean.slice(0, 3)}-${clean.slice(3, 6)}`;
}

export function slugifyProyectoNombre(nombre: string): string {
  return (
    nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "proyecto"
  );
}

export function getProyectoPathSegment(proyecto: Pick<Proyecto, "id" | "nombre">): string {
  const slug = slugifyProyectoNombre(proyecto.nombre);
  const codeSuffix = proyecto.id.replace(/-/g, "").slice(0, 6).toLowerCase();
  return `${slug}-${codeSuffix}`;
}

export function getProyectoVerPath(proyecto: Pick<Proyecto, "id" | "nombre">): string {
  return `/kore/proyectos/ver/${getProyectoPathSegment(proyecto)}`;
}

export function getProyectoEditarPath(proyecto: Pick<Proyecto, "id" | "nombre">): string {
  return `${getProyectoVerPath(proyecto)}/editar`;
}

export function getProyectoQrPath(proyecto: Pick<Proyecto, "id" | "nombre">): string {
  return `${getProyectoVerPath(proyecto)}/qr`;
}

export function formatProyectoSegmentLabel(segment: string): string {
  const parts = segment.split("-");
  const last = parts[parts.length - 1];
  if (parts.length > 1 && last.length === 6 && /^[a-f0-9]+$/.test(last)) {
    parts.pop();
  }
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function matchProyectoFromPathSegment(
  proyectos: Proyecto[],
  segment: string,
): Proyecto | undefined {
  const byId = proyectos.find((p) => p.id === segment);
  if (byId) return byId;

  const normalizedSegment = segment.toUpperCase();
  const byCode = proyectos.find((p) => getProyectoCode(p.id) === normalizedSegment);
  if (byCode) return byCode;

  const byPathSegment = proyectos.find((p) => getProyectoPathSegment(p) === segment);
  if (byPathSegment) return byPathSegment;

  const codeSuffix = segment.split("-").pop()?.toLowerCase();
  if (codeSuffix && codeSuffix.length === 6) {
    return proyectos.find(
      (p) => p.id.replace(/-/g, "").slice(0, 6).toLowerCase() === codeSuffix,
    );
  }

  return undefined;
}
