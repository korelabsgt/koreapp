# Graph Report - koreapp  (2026-08-20)

## Corpus Check
- 177 files · ~87,230 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 994 nodes · 1816 edges · 98 communities (55 shown, 43 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a05cae09`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- passkeys-actions.ts
- InfoUser.tsx
- ProyectoDetalle.tsx
- ClientesDashboard.tsx
- devDependencies
- Plantillas
- compilerOptions
- (settings)/hooks.ts
- ProyectoModal.tsx
- cn
- select.tsx
- normalizeEstadoProyecto
- components.json
- dialog.tsx
- proyectos/lib/actions.ts
- DevicesAccordion.tsx
- form.tsx
- MantenimientoProyectos.tsx
- UserProvider.tsx
- dropdown-menu.tsx
- createClient
- layout.tsx
- utils.ts
- DashboardProyectos.tsx
- QRProyecto.tsx
- VerPerfil.tsx
- dashboard/index.tsx
- dock.tsx
- Tablas de datos
- Menú lateral
- Gráficos SIGET
- src/proxy.ts
- badge.tsx
- @lottiefiles/dotlottie-react
- eslint.config.mjs
- file-saver
- ProyectoVerRedirect.tsx
- jspdf-autotable
- dependencies
- sheet.tsx
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
- devices/actions.ts
- date-fns
- framer-motion
- jspdf
- lucide
- morphicons
- qrcode.react
- @supabase/ssr
- css.d.ts
- popover.tsx
- clsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 148 edges
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
- `useProyectos()` --indirect_call--> `getProyectos()`  [INFERRED]
  src/components/(Kore)/proyectos/lib/hooks.ts → src/components/(Kore)/proyectos/lib/actions.ts

## Import Cycles
- None detected.

## Communities (98 total, 43 thin omitted)

### Community 0 - "passkeys-actions.ts"
Cohesion: 0.11
Nodes (24): ActionState, getPublicAppSettings(), login(), LogIn(), PasskeyPrompt(), getPasskeyOptions(), getPasskeys(), getPasskeysCount() (+16 more)

### Community 1 - "InfoUser.tsx"
Cohesion: 0.08
Nodes (30): ActionState, getAdminClient(), signup(), useSignupLogic(), AuthInput, authSchema, Input(), Label() (+22 more)

### Community 2 - "ProyectoDetalle.tsx"
Cohesion: 0.20
Nodes (16): RoleSimulator(), useUserContext(), ProyectoForm(), getProyectoCode(), getProyectoEditarPath(), getProyectoPathSegment(), getProyectoQrPath(), getProyectoVerPath() (+8 more)

### Community 3 - "ClientesDashboard.tsx"
Cohesion: 0.09
Nodes (27): Cliente, ClienteProyecto, ClientesDashboard(), COUNTRIES, getCode(), getWhatsAppLink(), parsePhoneNumber(), ClienteFormContent() (+19 more)

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
Nodes (18): DEFAULT_PCT, formatPhoneDisplay(), Input, ProyectoModal(), SelectWrap, TIPO_STYLE, proyectoSchema, TipoDeduccion (+10 more)

### Community 9 - "cn"
Cohesion: 0.10
Nodes (28): DashboardMorphIcon(), DeduccionRow(), Input(), Label(), Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup() (+20 more)

### Community 10 - "select.tsx"
Cohesion: 0.33
Nodes (4): SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton(), SelectSeparator()

### Community 11 - "normalizeEstadoProyecto"
Cohesion: 0.18
Nodes (15): ClientesModal(), ClientesModalProps, ClientGroup, ClientProjectItem, COUNTRIES, getCode(), getWhatsAppLink(), parsePhoneNumber() (+7 more)

### Community 12 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 13 - "dialog.tsx"
Cohesion: 0.16
Nodes (11): Button(), buttonVariants, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+3 more)

### Community 14 - "proyectos/lib/actions.ts"
Cohesion: 0.14
Nodes (27): CrearClienteModalProps, calculateNextCobroDate(), formatPaymentDateWithTime(), getMaintenanceBaseStartDate(), PagoMantenimientoModal(), parsePaymentDescription(), buildDeducciones(), createProyecto() (+19 more)

### Community 15 - "DevicesAccordion.tsx"
Cohesion: 0.28
Nodes (5): Device, DevicesAccordion(), UserGroup, Device, Dispositivos()

### Community 16 - "form.tsx"
Cohesion: 0.17
Nodes (13): react, react, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 17 - "MantenimientoProyectos.tsx"
Cohesion: 0.20
Nodes (12): metadata, AlertProyecto, formatDate(), getDaysUntil(), MaintenanceAlertBar(), getProyectos(), formatCobroDate(), formatMoney() (+4 more)

### Community 18 - "UserProvider.tsx"
Cohesion: 0.09
Nodes (26): AdminCards(), adminOptions, AdminPanel(), Header(), Menu(), MenuProps, UserContext, UserContextValue (+18 more)

### Community 19 - "dropdown-menu.tsx"
Cohesion: 0.12
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 20 - "createClient"
Cohesion: 0.06
Nodes (57): logout(), POST(), DELETE(), POST(), checkDeviceRequest(), createDeviceRequest(), notifyAdminsOfArrival(), notifySpecialRoles() (+49 more)

### Community 21 - "layout.tsx"
Cohesion: 0.15
Nodes (13): geistMono, geistSans, metadata, RootLayout(), viewport, AppBackground(), Providers(), ThemeProvider() (+5 more)

### Community 22 - "utils.ts"
Cohesion: 0.09
Nodes (16): AnimatedThemeToggler(), AnimatedThemeTogglerProps, BorderBeam(), BorderBeamProps, DotPattern(), DotPatternProps, GlareHover(), GlareHoverProps (+8 more)

### Community 23 - "DashboardProyectos.tsx"
Cohesion: 0.13
Nodes (15): DashboardProyectos(), EstadoPieSectorProps, formatDateSlash(), formatRangeInputDigits(), IntrinsicElements, JSX, LucideIconData, monthsAbbr (+7 more)

### Community 24 - "QRProyecto.tsx"
Cohesion: 0.32
Nodes (7): updateProyectoOtrosCampos(), useUpdateProyectoOtrosCampos(), OtrosCamposProyecto, QRProyecto(), QRProyectoProps, getAccessFieldsFromProyecto(), QRProyectoContent()

### Community 25 - "VerPerfil.tsx"
Cohesion: 0.29
Nodes (8): InfoPerfil(), InfoPerfilProps, Input(), Label(), Select(), useProfile(), VerPerfil(), VerPerfilProps

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

### Community 39 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, lucide-react, next-themes, dependencies, class-variance-authority, lucide-react, next-themes, @radix-ui/react-slot (+3 more)

### Community 40 - "sheet.tsx"
Cohesion: 0.18
Nodes (6): SheetContent(), SheetDescription(), SheetFooter(), SheetHeader(), SheetOverlay(), SheetTitle()

### Community 44 - "ProyectoForm.tsx"
Cohesion: 0.14
Nodes (12): DEFAULT_PCT, TIPO_STYLE, DeduccionItem, DeduccionItemConUsuario, deduccionItemSchema, EstadoProyecto, ESTADOS_PROYECTO, MantenimientoRecord (+4 more)

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

### Community 86 - "devices/actions.ts"
Cohesion: 0.39
Nodes (6): authorizeDevice(), denyDevice(), supabaseAdmin, supabaseServiceKey, supabaseUrl, AuthorizeButton()

### Community 97 - "popover.tsx"
Cohesion: 0.25
Nodes (6): Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle(), PopoverTrigger()

## Knowledge Gaps
- **332 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+327 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `passkeys-actions.ts`, `InfoUser.tsx`, `ProyectoDetalle.tsx`, `ProyectoModal.tsx`, `select.tsx`, `dialog.tsx`, `proyectos/lib/actions.ts`, `DevicesAccordion.tsx`, `form.tsx`, `MantenimientoProyectos.tsx`, `UserProvider.tsx`, `dropdown-menu.tsx`, `layout.tsx`, `utils.ts`, `DashboardProyectos.tsx`, `VerPerfil.tsx`, `dashboard/index.tsx`, `dock.tsx`, `badge.tsx`, `sheet.tsx`, `ProyectoForm.tsx`, `popover.tsx`?**
  _High betweenness centrality (0.281) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `form.tsx`, `@lottiefiles/dotlottie-react`, `file-saver`, `jspdf-autotable`, `motion`, `next`, `@radix-ui/react-avatar`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `react-dom`, `react-hook-form`, `@react-pdf/renderer`, `react-phone-number-input`, `react-qrcode-logo`, `react-toastify`, `recharts`, `@simplewebauthn/browser`, `@simplewebauthn/server`, `@supabase/supabase-js`, `sweetalert2`, `@sweetalert2/theme-dark`, `@tanstack/react-query`, `web-push`, `xlsx`, `zod`, `@hookform/resolvers`, `date-fns`, `framer-motion`, `jspdf`, `lucide`, `morphicons`, `qrcode.react`, `@supabase/ssr`, `clsx`?**
  _High betweenness centrality (0.167) - this node is a cross-community bridge._
- **Why does `DashboardProyectos()` connect `DashboardProyectos.tsx` to `jspdf`, `ProyectoDetalle.tsx`, `normalizeEstadoProyecto`, `cn`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _332 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `passkeys-actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10952380952380952 - nodes in this community are weakly interconnected._
- **Should `InfoUser.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07922705314009662 - nodes in this community are weakly interconnected._
- **Should `ClientesDashboard.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08902439024390243 - nodes in this community are weakly interconnected._