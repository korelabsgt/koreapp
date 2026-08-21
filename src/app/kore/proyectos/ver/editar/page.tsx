import { Suspense } from "react";
import ProyectoVerRedirect from "@/components/(Kore)/proyectos/ProyectoVerRedirect";

export default function EditarProyectoLegacyPage() {
  return (
    <Suspense>
      <ProyectoVerRedirect suffix="editar" />
    </Suspense>
  );
}
