# Graph Report - .  (2026-08-17)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 785 nodes · 1514 edges · 77 communities (39 shown, 38 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f8a332b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- createClient
- InfoUser.tsx
- UserProvider.tsx
- ClientesDashboard.tsx
- devDependencies
- finanzas/lib/hooks.ts
- compilerOptions
- (settings)/hooks.ts
- ProyectoModal.tsx
- cn
- ProyectoForm.tsx
- passkeys-actions.ts
- components.json
- dialog.tsx
- proyectos/lib/actions.ts
- card.tsx
- form.tsx
- MantenimientoProyectos.tsx
- Proyecto
- dropdown-menu.tsx
- FinanzasDashboard.tsx
- proyectos/lib/hooks.ts
- utils.ts
- DashboardProyectos.tsx
- QRProyectoView.tsx
- dependencies
- ClientesModal.tsx
- dock.tsx
- devices/actions.ts
- FinanzasChart.tsx
- particles.tsx
- src/proxy.ts
- badge.tsx
- class-variance-authority
- eslint.config.mjs
- file-saver
- @hookform/resolvers
- jspdf-autotable
- @lottiefiles/dotlottie-react
- lucide-react
- motion
- next
- next.config.ts
- next-themes
- @radix-ui/react-avatar
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-label
- @radix-ui/react-popover
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slot
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
- tailwind-merge
- @tanstack/react-query
- web-push
- xlsx
- zod
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `cn()` - 134 edges
2. `createClient()` - 64 edges
3. `useUserContext()` - 21 edges
4. `Proyecto` - 16 edges
5. `compilerOptions` - 16 edges
6. `useUser()` - 13 edges
7. `createClient()` - 13 edges
8. `PagoMantenimientoModal()` - 10 edges
9. `useProyectos()` - 10 edges
10. `MantenimientoProyectos()` - 9 edges

## Surprising Connections (you probably didn't know these)
- `DashboardProyectos()` --references--> `jspdf`  [EXTRACTED]
  src/components/(Kore)/proyectos/DashboardProyectos/DashboardProyectos.tsx → package.json
- `FormItem()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `useFormField()` --references--> `react`  [EXTRACTED]
  src/components/ui/form.tsx → package.json
- `RootLayout()` --calls--> `createClient()`  [EXTRACTED]
  src/app/layout.tsx → src/utils/supabase/server.ts
- `ClientesModalProps` --references--> `Proyecto`  [EXTRACTED]
  src/components/(Kore)/clientes/forms/ClientesModal.tsx → src/components/(Kore)/proyectos/lib/zod.ts

## Import Cycles
- None detected.

## Communities (77 total, 38 thin omitted)

### Community 0 - "createClient"
Cohesion: 0.07
Nodes (34): logout(), POST(), DELETE(), POST(), checkDeviceRequest(), createDeviceRequest(), notifyAdminsOfArrival(), notifySpecialRoles() (+26 more)

### Community 1 - "InfoUser.tsx"
Cohesion: 0.07
Nodes (39): ActionState, getAdminClient(), signup(), useSignupLogic(), AuthInput, authSchema, Input(), Label() (+31 more)

### Community 2 - "UserProvider.tsx"
Cohesion: 0.07
Nodes (30): geistMono, geistSans, metadata, RootLayout(), viewport, Dashboard(), Module, MODULES (+22 more)

### Community 3 - "ClientesDashboard.tsx"
Cohesion: 0.08
Nodes (29): Cliente, ClienteProyecto, ClientesDashboard(), COUNTRIES, getCode(), getWhatsAppLink(), parsePhoneNumber(), ClienteFormContent() (+21 more)

### Community 4 - "devDependencies"
Cohesion: 0.06
Nodes (33): babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss (+25 more)

### Community 5 - "finanzas/lib/hooks.ts"
Cohesion: 0.14
Nodes (25): metadata, FinanzasDashboard(), CrearGastoModal(), CrearGastoModalProps, actualizarGasto(), anularGasto(), anularIngreso(), crearGasto() (+17 more)

### Community 6 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 7 - "(settings)/hooks.ts"
Cohesion: 0.10
Nodes (12): metadata, PageProps, ProyectoPublicPage(), getAppSettings(), updateAppSettings(), useAppSettings(), useUpdateAppSettings(), AppSettings() (+4 more)

### Community 8 - "ProyectoModal.tsx"
Cohesion: 0.11
Nodes (23): DEFAULT_PCT, Input, SelectWrap, TIPO_STYLE, DeduccionItem, DeduccionItemConUsuario, deduccionItemSchema, MantenimientoRecord (+15 more)

### Community 9 - "cn"
Cohesion: 0.12
Nodes (21): Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup(), AvatarGroupCount(), AvatarImage(), SheetContent(), SheetDescription() (+13 more)

### Community 10 - "ProyectoForm.tsx"
Cohesion: 0.12
Nodes (14): DeduccionRow(), DEFAULT_PCT, Input(), Label(), TIPO_STYLE, Select(), SelectContent(), SelectItem() (+6 more)

### Community 11 - "passkeys-actions.ts"
Cohesion: 0.20
Nodes (16): PasskeyPrompt(), getPasskeys(), getPasskeysCount(), getRegistrationOptions(), origin, PasskeyDevice, removePasskey(), rpID (+8 more)

### Community 12 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 13 - "dialog.tsx"
Cohesion: 0.16
Nodes (11): Button(), buttonVariants, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay() (+3 more)

### Community 14 - "proyectos/lib/actions.ts"
Cohesion: 0.18
Nodes (17): CrearClienteModalProps, getCode(), ProyectoForm(), formatPhoneDisplay(), ProyectoModal(), buildDeducciones(), createProyecto(), findOrCreateCliente() (+9 more)

### Community 15 - "card.tsx"
Cohesion: 0.14
Nodes (12): Device, DevicesAccordion(), UserGroup, Device, Dispositivos(), Card(), CardAction(), CardContent() (+4 more)

### Community 16 - "form.tsx"
Cohesion: 0.17
Nodes (13): react, react, FormControl(), FormDescription(), FormFieldContext, FormFieldContextValue, FormItem(), FormItemContext (+5 more)

### Community 17 - "MantenimientoProyectos.tsx"
Cohesion: 0.20
Nodes (12): metadata, AlertProyecto, formatDate(), getDaysUntil(), MaintenanceAlertBar(), getProyectos(), formatCobroDate(), formatMoney() (+4 more)

### Community 18 - "Proyecto"
Cohesion: 0.15
Nodes (11): PagoMantenimientoModalProps, ProyectoFormProps, ProyectoModalProps, deleteProyecto(), useDeleteProyecto(), Proyecto, DASH_TIPO_STYLE, DetalleDed (+3 more)

### Community 19 - "dropdown-menu.tsx"
Cohesion: 0.12
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 20 - "FinanzasDashboard.tsx"
Cohesion: 0.19
Nodes (10): CustomDatePicker(), getDaysInMonth(), getFirstDay(), Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle() (+2 more)

### Community 21 - "proyectos/lib/hooks.ts"
Cohesion: 0.26
Nodes (13): calculateNextCobroDate(), formatPaymentDateWithTime(), getMaintenanceBaseStartDate(), PagoMantenimientoModal(), parsePaymentDescription(), eliminarPagoMantenimiento(), getMantenimientoHistorial(), getProyectoById() (+5 more)

### Community 22 - "utils.ts"
Cohesion: 0.13
Nodes (9): BorderBeam(), BorderBeamProps, DotPattern(), DotPatternProps, Separator(), animationProps, ShinyButton, ShinyButtonProps (+1 more)

### Community 23 - "DashboardProyectos.tsx"
Cohesion: 0.20
Nodes (9): jspdf, jspdf, DashboardProyectos(), formatDateSlash(), getWeeksOfMonth(), IntrinsicElements, JSX, monthsAbbr (+1 more)

### Community 24 - "QRProyectoView.tsx"
Cohesion: 0.27
Nodes (8): updateProyectoOtrosCampos(), useProyectos(), useUpdateProyectoOtrosCampos(), OtrosCamposProyecto, QRProyecto(), QRProyectoProps, getCode(), QRProyectoView()

### Community 25 - "dependencies"
Cohesion: 0.18
Nodes (11): clsx, date-fns, framer-motion, dependencies, clsx, date-fns, framer-motion, qrcode.react (+3 more)

### Community 26 - "ClientesModal.tsx"
Cohesion: 0.31
Nodes (8): ClientesModal(), ClientesModalProps, ClientGroup, ClientProjectItem, COUNTRIES, getCode(), getWhatsAppLink(), parsePhoneNumber()

### Community 27 - "dock.tsx"
Cohesion: 0.25
Nodes (8): Dock, DockContext, DockContextProps, DockIcon(), DockIconProps, DockProps, dockVariants, useDock()

### Community 28 - "devices/actions.ts"
Cohesion: 0.39
Nodes (6): authorizeDevice(), denyDevice(), supabaseAdmin, supabaseServiceKey, supabaseUrl, AuthorizeButton()

### Community 29 - "FinanzasChart.tsx"
Cohesion: 0.29
Nodes (7): DataPoint, FinanzasChart(), FinanzasChartProps, FlujoCajaItem, formatQ(), MONTH_NAMES, TooltipState

### Community 30 - "particles.tsx"
Cohesion: 0.47
Nodes (5): Circle, hexToRgb(), MousePosition, Particles(), ParticlesProps

### Community 31 - "src/proxy.ts"
Cohesion: 0.60
Nodes (3): config, proxy(), createClient()

## Knowledge Gaps
- **207 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **38 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `createClient`, `InfoUser.tsx`, `UserProvider.tsx`, `ClientesDashboard.tsx`, `ProyectoModal.tsx`, `ProyectoForm.tsx`, `passkeys-actions.ts`, `dialog.tsx`, `proyectos/lib/actions.ts`, `card.tsx`, `form.tsx`, `MantenimientoProyectos.tsx`, `dropdown-menu.tsx`, `FinanzasDashboard.tsx`, `proyectos/lib/hooks.ts`, `utils.ts`, `dock.tsx`, `particles.tsx`, `badge.tsx`?**
  _High betweenness centrality (0.374) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `form.tsx`, `DashboardProyectos.tsx`, `class-variance-authority`, `file-saver`, `@hookform/resolvers`, `jspdf-autotable`, `@lottiefiles/dotlottie-react`, `lucide-react`, `motion`, `next`, `next-themes`, `@radix-ui/react-avatar`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-label`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-separator`, `@radix-ui/react-slot`, `react-dom`, `react-hook-form`, `@react-pdf/renderer`, `react-phone-number-input`, `react-qrcode-logo`, `react-toastify`, `recharts`, `@simplewebauthn/browser`, `@simplewebauthn/server`, `@supabase/supabase-js`, `sweetalert2`, `@sweetalert2/theme-dark`, `tailwind-merge`, `@tanstack/react-query`, `web-push`, `xlsx`, `zod`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Why does `createClient()` connect `createClient` to `InfoUser.tsx`, `UserProvider.tsx`, `ClientesDashboard.tsx`, `finanzas/lib/hooks.ts`, `(settings)/hooks.ts`, `passkeys-actions.ts`, `proyectos/lib/actions.ts`, `MantenimientoProyectos.tsx`, `Proyecto`, `proyectos/lib/hooks.ts`, `QRProyectoView.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _207 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `createClient` be split into smaller, more focused modules?**
  _Cohesion score 0.07078039927404718 - nodes in this community are weakly interconnected._
- **Should `InfoUser.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07138047138047138 - nodes in this community are weakly interconnected._
- **Should `UserProvider.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07013574660633484 - nodes in this community are weakly interconnected._