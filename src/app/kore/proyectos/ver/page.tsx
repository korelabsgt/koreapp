import { Suspense } from "react";
import ProyectoVerRedirect from "@/components/(Kore)/proyectos/ProyectoVerRedirect";

export default function ProyectoVerLegacyPage() {
  return (
    <Suspense>
      <ProyectoVerRedirect />
    </Suspense>
  );
}
