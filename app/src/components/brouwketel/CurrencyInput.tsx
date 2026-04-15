"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

export function CurrencyInput({
  label,
  hint,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 10,
  required,
  className,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-hout">
        {label}
        {required && <span className="text-koper">*</span>}
      </label>
      {hint && <p className="text-xs text-hout-soft/80 -mt-0.5">{hint}</p>}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-hout-soft pointer-events-none">
          €
        </span>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(Number.isFinite(n) ? n : 0);
          }}
          required={required}
          className="w-full h-12 pl-8 pr-4 rounded-xl bg-schuim border border-hout/10 focus:border-koper outline-none transition-colors text-base"
        />
      </div>
    </div>
  );
}
