"use client";

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { MorphIcon } from "morphicons/react";
import { ArrowUpRight, MoveRight } from "lucide";

import { MagicCard } from "@/components/ui/magic-card";
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
  fillContainer?: boolean;
  iconPlacement?: "header" | "content-right" | "content-right-large";
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
  fillContainer = false,
  iconPlacement = "header",
  onClick,
  ...props
}: BentoCardProps) {
  const engaged = isActive || isHovered;
  const [gradientEnd, setGradientEnd] = useState("#e4e4e7");

  useEffect(() => {
    const updateGradientEnd = () => {
      setGradientEnd(
        document.documentElement.classList.contains("dark") ? "#18181b" : "#e4e4e7",
      );
    };
    updateGradientEnd();
    const observer = new MutationObserver(updateGradientEnd);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const iconInContent = iconPlacement === "content-right" || iconPlacement === "content-right-large";
  const iconLarge = iconPlacement === "content-right-large";

  const iconBox = (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 text-celeste-kore transition-transform duration-300 group-hover:scale-105 dark:border-zinc-700 dark:bg-zinc-950",
        iconLarge ? "size-20 md:size-24" : "size-14 md:size-16",
      )}
    >
      <MorphIcon
        icon={engaged ? iconActive : icon}
        size={iconLarge ? 48 : 32}
        strokeWidth={1.75}
        spring="snappy"
      />
    </div>
  );

  const featuredIconBox = (
    <div className="absolute top-2 bottom-2 left-2 z-20 aspect-square md:top-3 md:bottom-3 md:left-3">
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 text-celeste-kore transition-transform duration-300 group-hover:scale-[1.02] dark:border-zinc-700 dark:bg-zinc-950">
        <MorphIcon
          icon={engaged ? iconActive : icon}
          size={80}
          strokeWidth={1.5}
          spring="snappy"
        />
      </div>
    </div>
  );

  return (
    <MagicCard
      gradientFrom="#B7494E"
      gradientTo="#B7494E"
      gradientEnd={gradientEnd}
      gradientMidStop={34}
      gradientSize={featured ? 360 : 280}
      className={cn(
        "h-full w-full rounded-xl border border-zinc-300 bg-zinc-200 p-1 shadow-sm dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group relative flex h-full min-h-0 w-full cursor-pointer flex-col overflow-hidden rounded-[inherit] border-0 bg-transparent text-left outline-none",
          "transform-gpu transition-shadow duration-300 hover:shadow-md",
          isActive && "ring-2 ring-celeste-kore ring-offset-2 ring-offset-zinc-200 dark:ring-offset-zinc-900",
        )}
        {...props}
      >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden",
          featured ? "h-36 md:h-40" : "h-24 md:h-20",
        )}
      >
        <div className="absolute inset-0">{background}</div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-200 via-zinc-200/80 to-transparent dark:from-zinc-900 dark:via-zinc-900/70 dark:to-transparent" />
        {featured ? (
          featuredIconBox
        ) : iconPlacement === "header" ? (
          <div className="absolute top-3 right-3 z-20">{iconBox}</div>
        ) : null}
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col border-t border-zinc-300 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex h-full min-h-0 flex-1 flex-col justify-between gap-3 p-3 md:p-4">
          <div
            className={cn(
              "flex gap-3 md:gap-4",
              iconInContent ? "items-center" : "items-start",
            )}
          >
            <div className="min-w-0 flex-1 space-y-0.5">
              {subtitle ? (
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {subtitle}
                </p>
              ) : null}
              <h3
                className={cn(
                  "font-black uppercase leading-none tracking-tight text-zinc-900 dark:text-zinc-100",
                  featured ? "text-xl md:text-2xl" : "text-lg md:text-xl",
                )}
              >
                {name}
              </h3>
              <p className="text-sm font-medium leading-snug text-zinc-700 dark:text-zinc-300">
                {description}
              </p>
            </div>
            {iconInContent ? <div className="shrink-0">{iconBox}</div> : null}
          </div>

          <div
            className={cn(
              "flex shrink-0 items-center gap-2 text-celeste-kore transition-transform duration-300",
              engaged && "translate-x-1.5",
            )}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {isActive ? activeCta : cta}
            </span>
            <MorphIcon
              icon={engaged ? ArrowUpRight : MoveRight}
              size={featured ? 32 : 28}
              strokeWidth={2.5}
              spring="bouncy"
              className="text-celeste-kore"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-zinc-900/[0.02] group-hover:dark:bg-white/[0.03]" />
      </button>
    </MagicCard>
  );
}

export { BentoCard, BentoGrid };
export type { BentoCardProps, LucideIcon as BentoLucideIcon };
