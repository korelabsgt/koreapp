"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useProyectos } from "@/components/(Kore)/proyectos/lib/hooks";
import { getProyectoVerPath } from "@/components/(Kore)/proyectos/lib/helpers";

type ProyectoVerRedirectProps = {
  suffix?: "editar" | "qr";
};

export default function ProyectoVerRedirect({ suffix }: ProyectoVerRedirectProps) {
  const router = useRouter();
  const { data: proyectos, isLoading } = useProyectos();

  useEffect(() => {
    const id = sessionStorage.getItem("selectedProyectoId");
    if (!id) {
      router.replace("/kore/proyectos");
      return;
    }
    if (!proyectos) return;

    const found = proyectos.find((p) => p.id === id);
    if (!found) {
      router.replace("/kore/proyectos");
      return;
    }

    const basePath = getProyectoVerPath(found);
    router.replace(suffix ? `${basePath}/${suffix}` : basePath);
  }, [proyectos, router, suffix]);

  return (
    <div className="flex flex-1 items-center justify-center p-4 pt-32 md:p-8 md:pt-24">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <RefreshCw size={32} className="animate-spin text-celeste-kore" />
        <p className="text-sm font-bold uppercase tracking-widest">
          {isLoading ? "Cargando proyecto…" : "Redirigiendo…"}
        </p>
      </div>
    </div>
  );
}
