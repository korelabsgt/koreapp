"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type DateSegments = {
  day: string;
  month: string;
  year: string;
};

const parseSlashDate = (value: string): string | null => {
  const parts = value.split("/");
  if (parts.length !== 3) return null;
  const day = Number(parts[0]);
  const month = Number(parts[1]);
  const year = Number(parts[2]);
  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) return null;
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1000) return null;
  const iso = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const parsed = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getFullYear() !== year || parsed.getMonth() + 1 !== month || parsed.getDate() !== day) return null;
  return iso;
};

const isoToSegments = (iso: string): DateSegments => {
  const [year = "", month = "", day = ""] = iso.split("-");
  return {
    day: day.padStart(2, "0"),
    month: month.padStart(2, "0"),
    year,
  };
};

const segmentsToIso = (segments: DateSegments): string | null =>
  parseSlashDate(`${segments.day}/${segments.month}/${segments.year}`);

const SEGMENT_INPUT_CLASS =
  "h-full w-full min-w-0 border-0 bg-transparent px-0 text-center text-[10px] font-bold tabular-nums tracking-tight text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:bg-muted/30 sm:text-[11px]";

type RangeDateSegmentInputProps = {
  value: string;
  onCommit: (iso: string) => void;
  "aria-label": string;
  className?: string;
};

export function RangeDateSegmentInput({
  value,
  onCommit,
  "aria-label": ariaLabel,
  className,
}: RangeDateSegmentInputProps) {
  const [segments, setSegments] = useState<DateSegments>(() => isoToSegments(value));
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const committedRef = useRef(value);

  useEffect(() => {
    committedRef.current = value;
    setSegments(isoToSegments(value));
  }, [value]);

  const tryCommit = useCallback(
    (next: DateSegments) => {
      const iso = segmentsToIso(next);
      if (iso) onCommit(iso);
    },
    [onCommit],
  );

  const updateSegment = (
    part: keyof DateSegments,
    raw: string,
    maxLen: number,
    nextRef?: React.RefObject<HTMLInputElement | null>,
  ) => {
    const digits = raw.replace(/\D/g, "").slice(0, maxLen);
    setSegments((prev) => {
      const next = { ...prev, [part]: digits };
      if (digits.length === maxLen) {
        if (nextRef?.current) {
          requestAnimationFrame(() => {
            nextRef.current?.focus();
            nextRef.current?.select();
          });
        } else if (part === "year") {
          tryCommit(next);
        }
      }
      return next;
    });
  };

  const handleKeyDown = (
    part: keyof DateSegments,
    event: React.KeyboardEvent<HTMLInputElement>,
    prevRef?: React.RefObject<HTMLInputElement | null>,
  ) => {
    if (event.key !== "Backspace") return;
    if (segments[part].length > 0) return;

    event.preventDefault();
    if (!prevRef?.current) return;

    const prevPart: keyof DateSegments | null =
      part === "month" ? "day" : part === "year" ? "month" : null;
    if (!prevPart) return;

    prevRef.current.focus();
    setSegments((prev) => {
      const prevValue = prev[prevPart];
      if (prevValue.length === 0) return prev;
      return { ...prev, [prevPart]: prevValue.slice(0, -1) };
    });
  };

  const handleContainerBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (nextTarget && event.currentTarget.contains(nextTarget)) return;

    const normalized: DateSegments = {
      day: segments.day.length > 0 ? segments.day.padStart(2, "0") : segments.day,
      month: segments.month.length > 0 ? segments.month.padStart(2, "0") : segments.month,
      year: segments.year,
    };

    const iso = segmentsToIso(normalized);
    if (iso) {
      setSegments(normalized);
      onCommit(iso);
      return;
    }

    setSegments(isoToSegments(committedRef.current));
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text");
    const digits = pasted.replace(/\D/g, "").slice(0, 8);
    if (digits.length < 6) return;

    event.preventDefault();
    const next: DateSegments = {
      day: digits.slice(0, 2),
      month: digits.slice(2, 4),
      year: digits.slice(4, 8),
    };
    setSegments(next);
    if (next.year.length === 4) {
      tryCommit(next);
      yearRef.current?.blur();
    } else {
      yearRef.current?.focus();
    }
  };

  return (
    <div
      className={cn(
        "grid h-9 shrink-0 grid-cols-[2.1rem_auto_2.1rem_auto_3.1rem] items-center rounded-xl border border-border/40 bg-muted/20 px-1.5 sm:px-2",
        className,
      )}
      aria-label={ariaLabel}
      onBlur={handleContainerBlur}
    >
      <input
        ref={dayRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-label={`${ariaLabel}, día`}
        placeholder="DD"
        maxLength={2}
        value={segments.day}
        onChange={(event) => updateSegment("day", event.target.value, 2, monthRef)}
        onKeyDown={(event) => handleKeyDown("day", event)}
        onFocus={(event) => event.target.select()}
        onPaste={handlePaste}
        className={SEGMENT_INPUT_CLASS}
      />
      <span aria-hidden className="text-[10px] font-bold text-muted-foreground/70 sm:text-[11px]">
        /
      </span>
      <input
        ref={monthRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-label={`${ariaLabel}, mes`}
        placeholder="MM"
        maxLength={2}
        value={segments.month}
        onChange={(event) => updateSegment("month", event.target.value, 2, yearRef)}
        onKeyDown={(event) => handleKeyDown("month", event, dayRef)}
        onFocus={(event) => event.target.select()}
        className={SEGMENT_INPUT_CLASS}
      />
      <span aria-hidden className="text-[10px] font-bold text-muted-foreground/70 sm:text-[11px]">
        /
      </span>
      <input
        ref={yearRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        aria-label={`${ariaLabel}, año`}
        placeholder="AAAA"
        maxLength={4}
        value={segments.year}
        onChange={(event) => updateSegment("year", event.target.value, 4)}
        onKeyDown={(event) => handleKeyDown("year", event, monthRef)}
        onFocus={(event) => event.target.select()}
        className={SEGMENT_INPUT_CLASS}
      />
    </div>
  );
}
