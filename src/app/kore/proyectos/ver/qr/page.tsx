import { Suspense } from "react";
import ProyectoVerRedirect from "@/components/(Kore)/proyectos/ProyectoVerRedirect";

export default function ProyectoQRLegacyPage() {
  return (
    <Suspense>
      <ProyectoVerRedirect suffix="qr" />
    </Suspense>
  );
}
