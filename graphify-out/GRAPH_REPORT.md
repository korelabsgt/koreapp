# Graph Report - koreapp  (2026-08-20)

## Corpus Check
- 178 files · ~87,792 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1001 nodes · 1827 edges · 97 communities (55 shown, 42 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a05cae09`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- passkeys-actions.ts
- UserProvider.tsx
- ProyectoDetalle.tsx
- ClientesDashboard.tsx
- devDependencies
- Plantillas
- compilerOptions
- (settings)/hooks.ts
- ProyectoModal.tsx
- cn
- proyectos/lib/actions.ts
- proyectos/lib/zod.ts
- components.json
- dialog.tsx
- proyectos/lib/hooks.ts
- DevicesAccordion.tsx
- form.tsx
- MantenimientoProyectos.tsx
- header.tsx
- FinanzasDashboard.tsx
- createClient
- layout.tsx
- glare-hover.tsx
- DashboardProyectos.tsx
- QRProyecto.tsx
- FinanzasChart.tsx
- dashboard/index.tsx
- dock.tsx
- Tablas de datos
- Menú lateral
- Gráficos SIGET
- src/proxy.ts
- card.tsx
- @lottiefiles/dotlottie-react
- eslint.config.mjs
- file-saver
- MaintenanceAlertBar.tsx
- jspdf-autotable
- dependencies
- utils.ts
- motion
- next
- next.config.ts
- ProyectoForm.tsx
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-select
- @radix-ui/react-separator
- Fechas y hora (Guatemala)
- react-dom
- react-hook-form
- @react-pdf/renderer
- react-phone-number-input
- react-qrcode-logo
- react-toastify
- recharts
- @simplewebauthn/browser
- @simplewebauthn/server
- @supabase/supabase-js
- sweetalert2
- @sweetalert2/theme-dark
- OfflineBanner y estado de conexión
- @tanstack/react-query
- web-push
- xlsx
- zod
- postcss.config.mjs
- Documentación de Arquitectura del Sistema (Admo Tech)
- Tema y botones
- Modales
- SweetAlert 2
- Toastify
- @hookform/resolvers
- Animaciones de listas
- README.md
- dot-pattern.tsx
- date-fns
- framer-motion
- jspdf
- lucide
- morphicons
- qrcode.react
- @supabase/ssr
- css.d.ts
- clsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 150 edges
2. `createClient()` - 64 edges
3. `useUserContext()` - 21 edges
4. `normalizeEstadoProyecto()` - 20 edges
5. `Proyecto` - 17 edges
6. `compilerOptions` - 16 edges
7. `useUser()` - 13 edges
8. `createClient()` - 13 edges
9. `ProyectoDetalle()` - 12 edges
10. `ProyectoForm()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `DashboardProyectos()` --references--> `jspdf`  [EXTRACTED]
  src/components/(Kore)/proyectos/DashboardProyectos/DashboardProyectos.tsx → package.json
- `FormItem()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `RootLayout()` --calls--> `createClient()`  [EXTRACTED]
  src/app/layout.tsx → src/utils/supabase/server.ts
- `DashboardMorphIcon()` --calls--> `cn()`  [EXTRACTED]
  src/components/(Kore)/proyectos/DashboardProyectos/DashboardProyectos.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (97 total, 42 thin omitted)

### Community 0 - "passkeys-actions.ts"
Cohesion: 0.12
Nodes (22): ActionState, getPublicAppSettings(), login(), LogIn(), PasskeyPrompt(), getPasskeyOptions(), getPasskeys(), getPasskeysCount() (+14 more)

### Community 1 - "UserProvider.tsx"
Cohesion: 0.05
Nodes (52): ActionState, getAdminClient(), signup(), useSignupLogic(), AuthInput, authSchema, Input(), Label() (+44 more)

### Community 2 - "ProyectoDetalle.tsx"
Cohesion: 0.09
Nodes (35): RoleSimulator(), useUserContext(), ClientesModal(), ClientesModalProps, ClientGroup, ClientProjectItem, COUNTRIES, getCode() (+27 more)

### Community 3 - "ClientesDashboard.tsx"
Cohesion: 0.08
Nodes (29): Cliente, ClienteProyecto, ClientesDashboard(), COUNTRIES, getCode(), getWhatsAppLink(), parsePhoneNumber(), ClienteFormContent() (+21 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss (+25 more)

### Community 5 - "Plantillas"
Cohesion: 0.07
Nodes (25): 0. Fechas y hora (Guatemala), 1. `lib/zod.ts`, 2. `lib/actions.ts`, 3. `lib/hooks.ts`, 4. `lib/helpers.ts` (opcional), 5. `forms/Crear.tsx`, 6. `forms/VerEditar.tsx`, 7. `NombreRepresentativo.tsx` (+17 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "(settings)/hooks.ts"
Cohesion: 0.10
Nodes (12): metadata, PageProps, ProyectoPublicPage(), getAppSettings(), updateAppSettings(), useAppSettings(), useUpdateAppSettings(), AppSettings() (+4 more)

### Community 8 - "ProyectoModal.tsx"
Cohesion: 0.12
Nodes (18): DEFAULT_PCT, formatPhoneDisplay(), Input, ProyectoModal(), SelectWrap, TIPO_STYLE, ProyectoFormValues, TIPOS_DEDUCCION (+10 more)

### Community 9 - "cn"
Cohesion: 0.08
Nodes (29): AnimatedThemeToggler(), AnimatedThemeTogglerProps, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage() (+21 more)

### Community 10 - "proyectos/lib/actions.ts"
Cohesion: 0.23
Nodes (13): CrearClienteModalProps, buildDeducciones(), createProyecto(), findOrCreateCliente(), RawDeduccion, RawProyecto, registroPagoSchema, toDateMiddayGTM() (+5 more)

### Community 11 - "proyectos/lib/zod.ts"
Cohesion: 0.25
Nodes (8): DeduccionItem, DeduccionItemConUsuario, deduccionItemSchema, EstadoProyecto, MantenimientoRecord, Profile, proyectoSchema, TipoDeduccion

### Community 12 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 13 - "dialog.tsx"
Cohesion: 0.16
Nodes (11): Button(), buttonVariants, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+3 more)

### Community 14 - "proyectos/lib/hooks.ts"
Cohesion: 0.22
Nodes (15): calculateNextCobroDate(), formatPaymentDateWithTime(), getMaintenanceBaseStartDate(), PagoMantenimientoModal(), parsePaymentDescription(), deleteProyecto(), eliminarPagoMantenimiento(), getMantenimientoHistorial() (+7 more)

### Community 15 - "DevicesAccordion.tsx"
Cohesion: 0.16
Nodes (12): authorizeDevice(), denyDevice(), supabaseAdmin, supabaseServiceKey, supabaseUrl, AuthorizeButton(), Device, DevicesAccordion() (+4 more)

### Community 16 - "form.tsx"
Cohesion: 0.17
Nodes (13): react, react, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 17 - "MantenimientoProyectos.tsx"
Cohesion: 0.31
Nodes (7): metadata, formatCobroDate(), formatMoney(), formatPhoneDisplay(), formatWhatsAppLink(), getDaysUntil(), MantenimientoProyectos()

### Community 18 - "header.tsx"
Cohesion: 0.14
Nodes (14): AdminCards(), adminOptions, AdminPanel(), Header(), getPendingDevicesCount(), formatProyectoSegmentLabel(), AnimatedIcon(), AnimatedIconProps (+6 more)

### Community 19 - "FinanzasDashboard.tsx"
Cohesion: 0.09
Nodes (21): CustomDatePicker(), getDaysInMonth(), getFirstDay(), DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel() (+13 more)

### Community 20 - "createClient"
Cohesion: 0.07
Nodes (47): logout(), POST(), DELETE(), POST(), checkDeviceRequest(), createDeviceRequest(), notifyAdminsOfArrival(), notifySpecialRoles() (+39 more)

### Community 21 - "layout.tsx"
Cohesion: 0.15
Nodes (13): geistMono, geistSans, metadata, RootLayout(), viewport, AppBackground(), Providers(), ThemeProvider() (+5 more)

### Community 22 - "glare-hover.tsx"
Cohesion: 0.50
Nodes (4): GlareHover(), GlareHoverProps, parseHEX(), RGBA

### Community 23 - "DashboardProyectos.tsx"
Cohesion: 0.11
Nodes (17): DashboardMorphIcon(), ESTADO_PIE_CENTER_EASE, ESTADO_PIE_MOTION, EstadoPieSectorProps, IntrinsicElements, JSX, LucideIconData, monthsAbbr (+9 more)

### Community 24 - "QRProyecto.tsx"
Cohesion: 0.47
Nodes (5): updateProyectoOtrosCampos(), useUpdateProyectoOtrosCampos(), OtrosCamposProyecto, QRProyecto(), QRProyectoProps

### Community 25 - "FinanzasChart.tsx"
Cohesion: 0.29
Nodes (7): DataPoint, FinanzasChart(), FinanzasChartProps, FlujoCajaItem, formatQ(), MONTH_NAMES, TooltipState

### Community 26 - "dashboard/index.tsx"
Cohesion: 0.10
Nodes (20): CalendarPreview(), CLIENT_SNIPPETS, Dashboard(), FINANCE_BARS, getBentoGridClass(), getModuleLayout(), LucideIcon, Module (+12 more)

### Community 27 - "dock.tsx"
Cohesion: 0.25
Nodes (8): Dock, DockContext, DockContextProps, DockIcon(), DockIconProps, DockProps, dockVariants, useDock()

### Community 28 - "Tablas de datos"
Cohesion: 0.11
Nodes (17): Contenedor + toolbar, Footer paginación, Pill teléfono, Plantillas — ui-tablas, Tabla, Ancho, Checklist al crear o migrar, Cuándo aplicar (+9 more)

### Community 29 - "Menú lateral"
Cohesion: 0.11
Nodes (17): 1. Nuevo módulo (link directo), 2. Nueva sub-opción bajo acordeón, 3. Nueva opción admin, 4. Opción que abre modal (sin ruta), 5. Cambiar textos o roles, Arquitectura, Checklist final, Comportamiento del acordeón (+9 more)

### Community 30 - "Gráficos SIGET"
Cohesion: 0.12
Nodes (16): Acordeón (listados), Anillo de progreso, Animación de llenado, Barras agrupadas, Centro (reposo vs selección), Checklist, Colores, Dona canónica (obligatoria en código nuevo) (+8 more)

### Community 31 - "src/proxy.ts"
Cohesion: 0.60
Nodes (3): config, proxy(), createClient()

### Community 32 - "card.tsx"
Cohesion: 0.29
Nodes (6): CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle()

### Community 37 - "MaintenanceAlertBar.tsx"
Cohesion: 0.53
Nodes (5): AlertProyecto, formatDate(), getDaysUntil(), MaintenanceAlertBar(), getProyectos()

### Community 39 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, lucide-react, next-themes, dependencies, class-variance-authority, lucide-react, next-themes, @radix-ui/react-slot (+3 more)

### Community 40 - "utils.ts"
Cohesion: 0.40
Nodes (3): animationProps, ShinyButton, ShinyButtonProps

### Community 44 - "ProyectoForm.tsx"
Cohesion: 0.11
Nodes (14): DeduccionRow(), DEFAULT_PCT, Input(), Label(), TIPO_STYLE, ESTADOS_PROYECTO, Select(), SelectContent() (+6 more)

### Community 52 - "Fechas y hora (Guatemala)"
Cohesion: 0.22
Nodes (8): Fechas y hora (Guatemala), Formulario, Guardar, Helpers (`@/lib/fechas-gt.ts`), Mostrar, SQL mínimo, Tipos Postgres, Zod

### Community 65 - "OfflineBanner y estado de conexión"
Cohesion: 0.22
Nodes (8): Estados, Integración con el layout, Layouts que deben respetar el banner, Lógica dependiente de conexión, OfflineBanner y estado de conexión, Prohibido, Referencia, UI del banner

### Community 77 - "Documentación de Arquitectura del Sistema (Admo Tech)"
Cohesion: 0.22
Nodes (8): 1. Visión General del Sistema, 2. Tecnologías Utilizadas, 3.1. Plataforma Web (`back_admo_tech`), 3.2. Motor de Procesamiento ETL (`etl_module`), 3.3. Base de Datos Central y Auditoría, 3. Arquitectura por Componentes, 4. Flujo de Trabajo Resumido (Ejemplo de Ingesta), Documentación de Arquitectura del Sistema (Admo Tech)

### Community 78 - "Tema y botones"
Cohesion: 0.29
Nodes (6): Ejemplos, Menús y overlays flotantes, Reglas globales de botones, Superficies (paleta zinc), Tema y botones, Tipos de botón

### Community 79 - "Modales"
Cohesion: 0.33
Nodes (5): Comportamiento, Confirmación destructiva, Modales, Plantilla, Prohibido

### Community 80 - "SweetAlert 2"
Cohesion: 0.33
Nodes (5): Estilo, Helper compartido (obligatorio), Prohibido, SweetAlert 2, Wrapper opcional por módulo

### Community 81 - "Toastify"
Cohesion: 0.33
Nodes (5): Apariencia (obligatoria), Contenedor global, Prohibido, Toastify, Uso

### Community 83 - "Animaciones de listas"
Cohesion: 0.40
Nodes (4): Animaciones de listas, Patrón obligatorio, Prohibido, Reglas

### Community 84 - "README.md"
Cohesion: 0.40
Nodes (4): Deploy on Vercel, Getting Started, Learn More, thecarsplacelotinc

## Knowledge Gaps
- **336 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+331 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **42 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `passkeys-actions.ts`, `UserProvider.tsx`, `ProyectoDetalle.tsx`, `ClientesDashboard.tsx`, `ProyectoModal.tsx`, `dialog.tsx`, `proyectos/lib/hooks.ts`, `DevicesAccordion.tsx`, `form.tsx`, `MantenimientoProyectos.tsx`, `header.tsx`, `FinanzasDashboard.tsx`, `layout.tsx`, `glare-hover.tsx`, `DashboardProyectos.tsx`, `dashboard/index.tsx`, `dock.tsx`, `card.tsx`, `utils.ts`, `ProyectoForm.tsx`, `dot-pattern.tsx`?**
  _High betweenness centrality (0.305) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `form.tsx`, `@lottiefiles/dotlottie-react`, `file-saver`, `jspdf-autotable`, `motion`, `next`, `@radix-ui/react-avatar`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `react-dom`, `react-hook-form`, `@react-pdf/renderer`, `react-phone-number-input`, `react-qrcode-logo`, `react-toastify`, `recharts`, `@simplewebauthn/browser`, `@simplewebauthn/server`, `@supabase/supabase-js`, `sweetalert2`, `@sweetalert2/theme-dark`, `@tanstack/react-query`, `web-push`, `xlsx`, `zod`, `@hookform/resolvers`, `date-fns`, `framer-motion`, `jspdf`, `lucide`, `morphicons`, `qrcode.react`, `@supabase/ssr`, `clsx`?**
  _High betweenness centrality (0.210) - this node is a cross-community bridge._
- **Why does `DashboardProyectos()` connect `ProyectoDetalle.tsx` to `jspdf`, `cn`, `DashboardProyectos.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _336 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `passkeys-actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11931818181818182 - nodes in this community are weakly interconnected._
- **Should `UserProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.053164556962025315 - nodes in this community are weakly interconnected._
- **Should `ProyectoDetalle.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08780841799709724 - nodes in this community are weakly interconnected._