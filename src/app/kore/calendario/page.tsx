import { Suspense } from "react";

export default function CalendarioPage() {
  return (
    <Suspense>
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">
          Calendario
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Módulo en construcción.
        </p>
      </div>
    </Suspense>
  );
}
