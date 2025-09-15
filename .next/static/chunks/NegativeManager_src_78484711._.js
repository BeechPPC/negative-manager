(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/NegativeManager/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$3$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/tailwind-merge@3.3.1/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$3$2e$1$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/NegativeManager/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$3_$40$types$2b$react$40$19$2e$1$2e$13_react$40$19$2e$1$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/@radix-ui+react-slot@1.2.3_@types+react@19.1.13_react@19.1.0/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button(param) {
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$2$2e$3_$40$types$2b$react$40$19$2e$1$2e$13_react$40$19$2e$1$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/NegativeManager/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/NegativeManager/src/components/Layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/layout-dashboard.js [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const navigation = [
    {
        name: 'Dashboard',
        href: '/',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"]
    },
    {
        name: 'Search Terms',
        href: '/search-terms',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"]
    },
    {
        name: 'Negative Keywords',
        href: '/negative-keywords',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"]
    },
    {
        name: 'Analytics',
        href: '/analytics',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
    },
    {
        name: 'Export',
        href: '/export',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"]
    }
];
function Layout(param) {
    let { children } = param;
    _s();
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentTime, setCurrentTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Update time on client-side only to prevent hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Layout.useEffect": ()=>{
            const updateTime = {
                "Layout.useEffect.updateTime": ()=>{
                    setCurrentTime(new Date().toLocaleTimeString());
                }
            }["Layout.useEffect.updateTime"];
            // Set initial time
            updateTime();
            // Update time every second
            const interval = setInterval(updateTime, 1000);
            return ({
                "Layout.useEffect": ()=>clearInterval(interval)
            })["Layout.useEffect"];
        }
    }["Layout.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-gray-600 bg-opacity-75",
                        onClick: ()=>setSidebarOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-16 items-center justify-between px-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-bold text-gray-900",
                                        children: "Negative Manager"
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 86,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: ()=>setSidebarOpen(false),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                            lineNumber: 92,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 87,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex-1 space-y-1 px-2 py-4",
                                children: navigation.map((item)=>{
                                    const isActive = pathname === item.href;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors", isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"),
                                        onClick: ()=>setSidebarOpen(false),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mr-3 h-5 w-5 flex-shrink-0", isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500")
                                            }, void 0, false, {
                                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                lineNumber: 110,
                                                columnNumber: 19
                                            }, this),
                                            item.name
                                        ]
                                    }, item.name, true, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center flex-shrink-0 px-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-gray-900",
                                children: "Negative Manager"
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex-grow flex flex-col",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex-1 px-2 space-y-1",
                                children: navigation.map((item)=>{
                                    const isActive = pathname === item.href;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors", isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(item.icon, {
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mr-3 h-5 w-5 flex-shrink-0", isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500")
                                            }, void 0, false, {
                                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                lineNumber: 145,
                                                columnNumber: 21
                                            }, this),
                                            item.name
                                        ]
                                    }, item.name, true, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 135,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                    lineNumber: 126,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:pl-64 flex flex-col flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                className: "px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden",
                                onClick: ()=>setSidebarOpen(true),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "h-6 w-6"
                                }, void 0, false, {
                                    fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 px-4 flex justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1 flex",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full flex md:ml-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative w-full text-gray-400 focus-within:text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-y-0 left-0 flex items-center pointer-events-none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            className: "h-5 w-5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                            lineNumber: 177,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm",
                                                        placeholder: "Search...",
                                                        type: "search"
                                                    }, void 0, false, {
                                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "ml-4 flex items-center md:ml-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-3 relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center space-x-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-500",
                                                        children: [
                                                            "Last updated: ",
                                                            currentTime || '--:--:--'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                        lineNumber: 190,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "sm",
                                                        children: "Refresh"
                                                    }, void 0, false, {
                                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                        lineNumber: 193,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                                lineNumber: 189,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                            lineNumber: 188,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto px-4 sm:px-6 md:px-8",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/NegativeManager/src/components/Layout.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/NegativeManager/src/components/Layout.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_s(Layout, "6PosvgqEiwK8s46+B9adJy/15ms=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Layout;
var _c;
__turbopack_context__.k.register(_c, "Layout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/NegativeManager/src/utils/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "cacheUtils",
    ()=>cacheUtils,
    "dashboardApi",
    ()=>dashboardApi,
    "dataTransformers",
    ()=>dataTransformers,
    "errorHandlers",
    ()=>errorHandlers,
    "negativeKeywordsApi",
    ()=>negativeKeywordsApi,
    "searchTermsApi",
    ()=>searchTermsApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// Base API configuration
const API_BASE_URL = ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbzkx-WP0qVlZ2Ah-D3lkESD8tEaXFvJ6OO-uGyWQ6Lt2atQBybqgNBV2D8BCe9S95q9Mw/exec") || '';
// Default headers for API requests
const defaultHeaders = {
    'Content-Type': 'application/json'
};
// Generic API request function using Next.js API proxy
async function apiRequest(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    try {
        // Use Next.js API route as proxy to avoid CORS issues
        const proxyUrl = "/api/proxy".concat(endpoint);
        const response = await fetch(proxyUrl, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        });
        if (!response.ok) {
            throw new Error("HTTP error! status: ".concat(response.status));
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}
const searchTermsApi = {
    // Get all search term data
    async getAll () {
        return apiRequest('?action=search-terms');
    },
    // Get search terms with pagination
    async getPaginated () {
        let page = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1, pageSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50, filters = arguments.length > 2 ? arguments[2] : void 0;
        const params = new URLSearchParams({
            action: 'search-terms',
            page: page.toString(),
            pageSize: pageSize.toString(),
            ...filters && {
                filters: JSON.stringify(filters)
            }
        });
        return apiRequest("?".concat(params));
    },
    // Get search terms by campaign
    async getByCampaign (campaignName) {
        const params = new URLSearchParams({
            action: 'search-terms',
            campaign: campaignName
        });
        return apiRequest("?".concat(params));
    },
    // Get search terms by ad group
    async getByAdGroup (adGroupName) {
        const params = new URLSearchParams({
            action: 'search-terms',
            adGroup: adGroupName
        });
        return apiRequest("?".concat(params));
    },
    // Get high-cost, low-converting search terms (negative keyword opportunities)
    async getNegativeKeywordOpportunities () {
        let minCost = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 10, maxConversions = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        const params = new URLSearchParams({
            action: 'search-terms',
            minCost: minCost.toString(),
            maxConversions: maxConversions.toString()
        });
        return apiRequest("?".concat(params));
    }
};
const negativeKeywordsApi = {
    // Get all negative keywords
    async getAll () {
        return apiRequest('?action=negative-keywords');
    },
    // Get negative keywords by campaign
    async getByCampaign (campaignId) {
        const params = new URLSearchParams({
            action: 'negative-keywords',
            campaignId: campaignId
        });
        return apiRequest("?".concat(params));
    },
    // Get negative keywords by ad group
    async getByAdGroup (adGroupId) {
        const params = new URLSearchParams({
            action: 'negative-keywords',
            adGroupId: adGroupId
        });
        return apiRequest("?".concat(params));
    },
    // Get shared negative keyword lists
    async getSharedLists () {
        const params = new URLSearchParams({
            action: 'negative-keywords',
            type: 'shared'
        });
        return apiRequest("?".concat(params));
    },
    // Add negative keywords
    async add (request) {
        try {
            const response = await apiRequest('?action=add-negative-keywords', {
                method: 'POST',
                body: JSON.stringify(request)
            });
            // Log the response for debugging
            console.log('Add negative keywords response:', response);
            return response;
        } catch (error) {
            console.error('Error adding negative keywords:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to add negative keywords'
            };
        }
    },
    // Remove negative keyword
    async remove (keywordId) {
        const params = new URLSearchParams({
            action: 'remove-negative-keyword',
            id: keywordId
        });
        return apiRequest("?".concat(params), {
            method: 'POST'
        });
    }
};
const dashboardApi = {
    // Get dashboard metrics
    async getMetrics () {
        return apiRequest('?action=dashboard');
    },
    // Get spend distribution data
    async getSpendDistribution () {
        return apiRequest('?action=spend-distribution');
    },
    // Get performance trends
    async getPerformanceTrends () {
        let days = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 30;
        return apiRequest("?action=trends&days=".concat(days));
    }
};
const dataTransformers = {
    // Convert Google Sheets row to SearchTermData
    transformSearchTermRow (row) {
        return {
            id: row[0] || '',
            searchTerm: row[1] || '',
            campaignName: row[2] || '',
            adGroupName: row[3] || '',
            keywordText: row[4] || '',
            cost: Number(row[5]) || 0,
            clicks: Number(row[6]) || 0,
            impressions: Number(row[7]) || 0,
            conversions: Number(row[8]) || 0,
            costPerConversion: Number(row[9]) || 0,
            ctr: Number(row[10]) || 0,
            cpc: Number(row[11]) || 0,
            associatedNegativeKeywordLists: row[12] ? row[12].split(',') : [],
            date: row[13] || new Date().toISOString()
        };
    },
    // Convert SearchTermData to Google Sheets row
    transformToSheetRow (data) {
        return [
            data.id,
            data.searchTerm,
            data.campaignName,
            data.adGroupName,
            data.keywordText,
            data.cost,
            data.clicks,
            data.impressions,
            data.conversions,
            data.costPerConversion,
            data.ctr,
            data.cpc,
            data.associatedNegativeKeywordLists.join(','),
            data.date
        ];
    },
    // Calculate derived metrics
    calculateMetrics (data) {
        const ctr = data.impressions > 0 ? data.clicks / data.impressions * 100 : 0;
        const cpc = data.clicks > 0 ? data.cost / data.clicks : 0;
        const costPerConversion = data.conversions > 0 ? data.cost / data.conversions : 0;
        return {
            ctr: Number(ctr.toFixed(2)),
            cpc: Number(cpc.toFixed(2)),
            costPerConversion: Number(costPerConversion.toFixed(2))
        };
    }
};
const errorHandlers = {
    // Handle API errors with user-friendly messages
    getErrorMessage (error) {
        if (typeof error === 'string') return error;
        if (error === null || error === void 0 ? void 0 : error.message) return error.message;
        if (error === null || error === void 0 ? void 0 : error.error) return error.error;
        return 'An unexpected error occurred';
    },
    // Check if error is network related
    isNetworkError (error) {
        var _error_message, _error_message1, _error_message2;
        return (error === null || error === void 0 ? void 0 : (_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('fetch')) || (error === null || error === void 0 ? void 0 : (_error_message1 = error.message) === null || _error_message1 === void 0 ? void 0 : _error_message1.includes('network')) || (error === null || error === void 0 ? void 0 : (_error_message2 = error.message) === null || _error_message2 === void 0 ? void 0 : _error_message2.includes('Failed to fetch'));
    },
    // Check if error is authentication related
    isAuthError (error) {
        var _error_message, _error_message1, _error_message2;
        return (error === null || error === void 0 ? void 0 : (_error_message = error.message) === null || _error_message === void 0 ? void 0 : _error_message.includes('401')) || (error === null || error === void 0 ? void 0 : (_error_message1 = error.message) === null || _error_message1 === void 0 ? void 0 : _error_message1.includes('unauthorized')) || (error === null || error === void 0 ? void 0 : (_error_message2 = error.message) === null || _error_message2 === void 0 ? void 0 : _error_message2.includes('authentication'));
    }
};
const cacheUtils = {
    // Simple in-memory cache
    cache: new Map(),
    // Set cache entry
    set (key, data) {
        let ttl = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 5 * 60 * 1000;
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        });
    },
    // Get cache entry
    get (key) {
        const entry = this.cache.get(key);
        if (!entry) return null;
        const isExpired = Date.now() - entry.timestamp > entry.ttl;
        if (isExpired) {
            this.cache.delete(key);
            return null;
        }
        return entry.data;
    },
    // Clear cache
    clear () {
        this.cache.clear();
    },
    // Clear expired entries
    clearExpired () {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()){
            if (now - entry.timestamp > entry.ttl) {
                this.cache.delete(key);
            }
        }
    }
};
const api = {
    searchTerms: searchTermsApi,
    negativeKeywords: negativeKeywordsApi,
    dashboard: dashboardApi,
    transformers: dataTransformers,
    errors: errorHandlers,
    cache: cacheUtils
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/NegativeManager/src/hooks/useNegativeKeywords.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdGroupNegativeKeywords",
    ()=>useAdGroupNegativeKeywords,
    "useCampaignNegativeKeywords",
    ()=>useCampaignNegativeKeywords,
    "useNegativeKeywordOperations",
    ()=>useNegativeKeywordOperations,
    "useNegativeKeywords",
    ()=>useNegativeKeywords,
    "useSharedNegativeKeywordLists",
    ()=>useSharedNegativeKeywordLists
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/utils/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
'use client';
;
;
function useNegativeKeywords() {
    _s();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: null,
        loading: 'idle',
        error: null
    });
    // Fetch negative keywords data
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywords.useCallback[fetchData]": async ()=>{
            setState({
                "useNegativeKeywords.useCallback[fetchData]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useNegativeKeywords.useCallback[fetchData]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.getAll();
                if (response.success && response.data) {
                    setState({
                        data: response.data,
                        loading: 'success',
                        error: null
                    });
                } else {
                    setState({
                        data: null,
                        loading: 'error',
                        error: response.error || 'Failed to fetch negative keywords'
                    });
                }
            } catch (error) {
                setState({
                    data: null,
                    loading: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        }
    }["useNegativeKeywords.useCallback[fetchData]"], []);
    // Add negative keywords
    const addNegativeKeywords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywords.useCallback[addNegativeKeywords]": async (request)=>{
            setState({
                "useNegativeKeywords.useCallback[addNegativeKeywords]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useNegativeKeywords.useCallback[addNegativeKeywords]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.add(request);
                if (response.success && response.data) {
                    // Refresh data after successful addition
                    await fetchData();
                    return response.data;
                } else {
                    setState({
                        "useNegativeKeywords.useCallback[addNegativeKeywords]": (prev)=>({
                                ...prev,
                                loading: 'error',
                                error: response.error || 'Failed to add negative keywords'
                            })
                    }["useNegativeKeywords.useCallback[addNegativeKeywords]"]);
                    // Return the response even if there are errors so the UI can handle them
                    return response;
                }
            } catch (error) {
                setState({
                    "useNegativeKeywords.useCallback[addNegativeKeywords]": (prev)=>({
                            ...prev,
                            loading: 'error',
                            error: error instanceof Error ? error.message : 'Unknown error occurred'
                        })
                }["useNegativeKeywords.useCallback[addNegativeKeywords]"]);
                throw error;
            }
        }
    }["useNegativeKeywords.useCallback[addNegativeKeywords]"], [
        fetchData
    ]);
    // Remove negative keyword
    const removeNegativeKeyword = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywords.useCallback[removeNegativeKeyword]": async (keywordId)=>{
            setState({
                "useNegativeKeywords.useCallback[removeNegativeKeyword]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useNegativeKeywords.useCallback[removeNegativeKeyword]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.remove(keywordId);
                if (response.success) {
                    // Refresh data after successful removal
                    await fetchData();
                    return true;
                } else {
                    setState({
                        "useNegativeKeywords.useCallback[removeNegativeKeyword]": (prev)=>({
                                ...prev,
                                loading: 'error',
                                error: response.error || 'Failed to remove negative keyword'
                            })
                    }["useNegativeKeywords.useCallback[removeNegativeKeyword]"]);
                    return false;
                }
            } catch (error) {
                setState({
                    "useNegativeKeywords.useCallback[removeNegativeKeyword]": (prev)=>({
                            ...prev,
                            loading: 'error',
                            error: error instanceof Error ? error.message : 'Unknown error occurred'
                        })
                }["useNegativeKeywords.useCallback[removeNegativeKeyword]"]);
                return false;
            }
        }
    }["useNegativeKeywords.useCallback[removeNegativeKeyword]"], [
        fetchData
    ]);
    // Refresh data
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywords.useCallback[refresh]": ()=>{
            fetchData();
        }
    }["useNegativeKeywords.useCallback[refresh]"], [
        fetchData
    ]);
    // Auto-fetch on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useNegativeKeywords.useEffect": ()=>{
            fetchData();
        }
    }["useNegativeKeywords.useEffect"], [
        fetchData
    ]);
    return {
        // State
        data: state.data,
        loading: state.loading,
        error: state.error,
        // Actions
        fetchData,
        addNegativeKeywords,
        removeNegativeKeyword,
        refresh,
        // Computed values
        hasData: state.data && (state.data.data.campaign.length > 0 || state.data.data.adGroup.length > 0 || state.data.data.shared.length > 0),
        isEmpty: state.data && state.data.data.campaign.length === 0 && state.data.data.adGroup.length === 0 && state.data.data.shared.length === 0,
        isLoading: state.loading === 'loading',
        isError: state.loading === 'error',
        isSuccess: state.loading === 'success'
    };
}
_s(useNegativeKeywords, "v/xOk9z9WQHDkyxKEOk6WkPmIoE=");
function useCampaignNegativeKeywords(campaignId) {
    _s1();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: null,
        loading: 'idle',
        error: null
    });
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCampaignNegativeKeywords.useCallback[fetchData]": async ()=>{
            if (!campaignId) {
                setState({
                    data: null,
                    loading: 'idle',
                    error: null
                });
                return;
            }
            setState({
                "useCampaignNegativeKeywords.useCallback[fetchData]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useCampaignNegativeKeywords.useCallback[fetchData]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.getByCampaign(campaignId);
                if (response.success && response.data) {
                    setState({
                        data: response.data,
                        loading: 'success',
                        error: null
                    });
                } else {
                    setState({
                        data: null,
                        loading: 'error',
                        error: response.error || 'Failed to fetch campaign negative keywords'
                    });
                }
            } catch (error) {
                setState({
                    data: null,
                    loading: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        }
    }["useCampaignNegativeKeywords.useCallback[fetchData]"], [
        campaignId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCampaignNegativeKeywords.useEffect": ()=>{
            fetchData();
        }
    }["useCampaignNegativeKeywords.useEffect"], [
        fetchData
    ]);
    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        refresh: fetchData,
        isLoading: state.loading === 'loading',
        isError: state.loading === 'error',
        isSuccess: state.loading === 'success'
    };
}
_s1(useCampaignNegativeKeywords, "Q1me6CHfmRowoi3jKmKgklCqYho=");
function useAdGroupNegativeKeywords(adGroupId) {
    _s2();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: null,
        loading: 'idle',
        error: null
    });
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdGroupNegativeKeywords.useCallback[fetchData]": async ()=>{
            if (!adGroupId) {
                setState({
                    data: null,
                    loading: 'idle',
                    error: null
                });
                return;
            }
            setState({
                "useAdGroupNegativeKeywords.useCallback[fetchData]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useAdGroupNegativeKeywords.useCallback[fetchData]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.getByAdGroup(adGroupId);
                if (response.success && response.data) {
                    setState({
                        data: response.data,
                        loading: 'success',
                        error: null
                    });
                } else {
                    setState({
                        data: null,
                        loading: 'error',
                        error: response.error || 'Failed to fetch ad group negative keywords'
                    });
                }
            } catch (error) {
                setState({
                    data: null,
                    loading: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        }
    }["useAdGroupNegativeKeywords.useCallback[fetchData]"], [
        adGroupId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdGroupNegativeKeywords.useEffect": ()=>{
            fetchData();
        }
    }["useAdGroupNegativeKeywords.useEffect"], [
        fetchData
    ]);
    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        refresh: fetchData,
        isLoading: state.loading === 'loading',
        isError: state.loading === 'error',
        isSuccess: state.loading === 'success'
    };
}
_s2(useAdGroupNegativeKeywords, "Q1me6CHfmRowoi3jKmKgklCqYho=");
function useSharedNegativeKeywordLists() {
    _s3();
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        data: null,
        loading: 'idle',
        error: null
    });
    const fetchData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSharedNegativeKeywordLists.useCallback[fetchData]": async ()=>{
            setState({
                "useSharedNegativeKeywordLists.useCallback[fetchData]": (prev)=>({
                        ...prev,
                        loading: 'loading'
                    })
            }["useSharedNegativeKeywordLists.useCallback[fetchData]"]);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].negativeKeywords.getSharedLists();
                if (response.success && response.data) {
                    setState({
                        data: response.data,
                        loading: 'success',
                        error: null
                    });
                } else {
                    setState({
                        data: null,
                        loading: 'error',
                        error: response.error || 'Failed to fetch shared negative keyword lists'
                    });
                }
            } catch (error) {
                setState({
                    data: null,
                    loading: 'error',
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        }
    }["useSharedNegativeKeywordLists.useCallback[fetchData]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSharedNegativeKeywordLists.useEffect": ()=>{
            fetchData();
        }
    }["useSharedNegativeKeywordLists.useEffect"], [
        fetchData
    ]);
    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        refresh: fetchData,
        isLoading: state.loading === 'loading',
        isError: state.loading === 'error',
        isSuccess: state.loading === 'success'
    };
}
_s3(useSharedNegativeKeywordLists, "Q1me6CHfmRowoi3jKmKgklCqYho=");
function useNegativeKeywordOperations() {
    _s4();
    const [operationState, setOperationState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        loading: false,
        error: null,
        lastOperation: null
    });
    const executeOperation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywordOperations.useCallback[executeOperation]": async (operation, operationName)=>{
            setOperationState({
                loading: true,
                error: null,
                lastOperation: operationName
            });
            try {
                const result = await operation();
                setOperationState({
                    loading: false,
                    error: null,
                    lastOperation: operationName
                });
                return result;
            } catch (error) {
                setOperationState({
                    loading: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred',
                    lastOperation: operationName
                });
                throw error;
            }
        }
    }["useNegativeKeywordOperations.useCallback[executeOperation]"], []);
    const clearError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useNegativeKeywordOperations.useCallback[clearError]": ()=>{
            setOperationState({
                "useNegativeKeywordOperations.useCallback[clearError]": (prev)=>({
                        ...prev,
                        error: null
                    })
            }["useNegativeKeywordOperations.useCallback[clearError]"]);
        }
    }["useNegativeKeywordOperations.useCallback[clearError]"], []);
    return {
        ...operationState,
        executeOperation,
        clearError
    };
}
_s4(useNegativeKeywordOperations, "gT53SucMj3v4by4S0ovuFtCGrRo=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/NegativeManager/src/app/negative-keywords/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NegativeKeywordsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/next@15.5.3_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/components/Layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/NegativeManager/node_modules/.pnpm/lucide-react@0.544.0_react@19.1.0/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$hooks$2f$useNegativeKeywords$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/NegativeManager/src/hooks/useNegativeKeywords.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function NegativeKeywordsPage() {
    var _negativeKeywordsData_campaign, _negativeKeywordsData_adGroup, _negativeKeywordsData_shared;
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedLevel, setSelectedLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedMatchType, setSelectedMatchType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [selectedKeywords, setSelectedKeywords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const { data: negativeKeywordsData, loading, error, removeNegativeKeyword, refresh } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$hooks$2f$useNegativeKeywords$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNegativeKeywords"])();
    // Format date
    const formatDate = (dateString)=>{
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (error) {
            return 'Invalid Date';
        }
    };
    // Show loading state
    if (loading === 'loading') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-8 bg-gray-200 rounded animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-64 bg-gray-200 rounded animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this);
    }
    // Show error state
    if (loading === 'error' || error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-md p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-5 w-5 text-red-400"
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-medium text-red-800",
                                        children: "Error loading negative keywords"
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 text-sm text-red-700",
                                        children: error || 'An unexpected error occurred'
                                    }, void 0, false, {
                                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                    lineNumber: 86,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this);
    }
    // Show success state with data
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$Layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-900",
                            children: "Negative Keywords"
                        }, void 0, false, {
                            fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$544$2e$0_react$40$19$2e$1$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "h-4 w-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                "Add Keywords"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                    lineNumber: 106,
                    columnNumber: 9
                }, this),
                negativeKeywordsData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-medium text-gray-900 mb-4",
                                children: "Negative Keywords Data"
                            }, void 0, false, {
                                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Campaign keywords: ",
                                            ((_negativeKeywordsData_campaign = negativeKeywordsData.campaign) === null || _negativeKeywordsData_campaign === void 0 ? void 0 : _negativeKeywordsData_campaign.length) || 0
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Ad Group keywords: ",
                                            ((_negativeKeywordsData_adGroup = negativeKeywordsData.adGroup) === null || _negativeKeywordsData_adGroup === void 0 ? void 0 : _negativeKeywordsData_adGroup.length) || 0
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$5$2e$3_react$2d$dom$40$19$2e$1$2e$0_react$40$19$2e$1$2e$0_$5f$react$40$19$2e$1$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Shared keywords: ",
                                            ((_negativeKeywordsData_shared = negativeKeywordsData.shared) === null || _negativeKeywordsData_shared === void 0 ? void 0 : _negativeKeywordsData_shared.length) || 0
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                        lineNumber: 116,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
                    lineNumber: 115,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
            lineNumber: 105,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/NegativeManager/src/app/negative-keywords/page.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
_s(NegativeKeywordsPage, "sj1khDvsEJ4LW3GkmYV+u1DeCxI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$NegativeManager$2f$src$2f$hooks$2f$useNegativeKeywords$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNegativeKeywords"]
    ];
});
_c = NegativeKeywordsPage;
var _c;
__turbopack_context__.k.register(_c, "NegativeKeywordsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=NegativeManager_src_78484711._.js.map