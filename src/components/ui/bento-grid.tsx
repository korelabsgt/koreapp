"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowUpRight, MoveRight } from "lucide";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type LucideIcon = typeof MoveRight;

interface BentoCardProps extends ComponentPropsWithoutRef<"button"> {
  name: string;
  subtitle?: string;
  className: string;
  background: ReactNode;
  icon: LucideIcon;
  iconActive: LucideIcon;
  description: string;
  cta?: string;
  activeCta?: string;
  isActive?: boolean;
  isHovered?: boolean;
  featured?: boolean;
}

function BentoCard({
  name,
  subtitle,
  className,
  background,
  icon,
  iconActive,
  description,
  cta = "Entrar",
  activeCta = "Toca de nuevo",
  isActive = false,
  isHovered = false,
  featured = false,
  onClick,
  ...props
}: BentoCardProps) {
  const engaged = isActive || isHovered;

  const iconBox = (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 text-celeste-kore transition-transform duration-300 group-hover:scale-105 dark:border-zinc-700 dark:bg-zinc-950",
        featured ? "size-20 md:size-[5.5rem]" : "size-14 md:size-16",
      )}
    >
      <MorphIcon
        icon={engaged ? iconActive : icon}
        size={featured ? 44 : 32}
        strokeWidth={1.75}
        spring="snappy"
      />
    </div>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border text-left outline-none",
        "border-zinc-300 bg-zinc-200 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        "transform-gpu transition-shadow duration-300 hover:shadow-md",
        featured ? "min-h-[22rem] md:min-h-[26rem]" : "min-h-[13rem] md:min-h-[12rem]",
        isActive && "ring-2 ring-celeste-kore",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden",
          featured ? "h-44 md:h-56" : "h-28 md:h-24",
        )}
      >
        <div className="absolute inset-0">{background}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-200 via-zinc-200/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/70 dark:to-transparent" />
        {!featured ? (
          <div className="absolute top-3 right-3 z-20">{iconBox}</div>
        ) : null}
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-4 border-t border-zinc-300 bg-zinc-200 p-5 dark:border-zinc-800 dark:bg-zinc-900 md:p-6">
        <div className={cn("flex items-start", featured ? "gap-4" : "")}>
          {featured ? iconBox : null}
          <div className="min-w-0 flex-1 space-y-1">
            {subtitle ? (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {subtitle}
              </p>
            ) : null}
            <h3
              className={cn(
                "font-black uppercase leading-none tracking-tight text-zinc-900 dark:text-zinc-100",
                featured ? "text-2xl md:text-3xl" : "text-xl",
              )}
            >
              {name}
            </h3>
            <p className="text-sm font-medium leading-snug text-zinc-700 dark:text-zinc-300">
              {description}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center gap-3 text-celeste-kore transition-transform duration-300",
            engaged && "translate-x-1.5",
          )}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            {isActive ? activeCta : cta}
          </span>
          <MorphIcon
            icon={engaged ? ArrowUpRight : MoveRight}
            size={featured ? 36 : 30}
            strokeWidth={2.5}
            spring="bouncy"
            className="text-celeste-kore"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-zinc-900/[0.02] group-hover:dark:bg-white/[0.03]" />
    </button>
  );
}

export { BentoCard, BentoGrid };
export type { BentoCardProps, LucideIcon as BentoLucideIcon };
