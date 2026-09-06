import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "brass" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const variants = {
    primary: "bg-oxblood text-raised hover:bg-oxblood-deep shadow-e1",
    secondary: "bg-ink text-raised hover:bg-ink-soft shadow-e1",
    outline: "border border-interactive text-ink hover:bg-recessed",
    ghost: "text-oxblood hover:bg-recessed underline-offset-4 hover:underline",
    brass: "bg-brass-tint text-ink hover:bg-brass shadow-e1",
    danger: "bg-danger text-raised hover:bg-oxblood-deep",
  };
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Plate({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-hairline bg-raised p-5 shadow-e1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function MetricBar({
  label,
  value,
  tone = "oxblood",
}: {
  label: string;
  value: number;
  tone?: "oxblood" | "sage" | "brass" | "danger";
}) {
  const fill = {
    oxblood: "bg-oxblood",
    sage: "bg-sage",
    brass: "bg-brass",
    danger: "bg-danger",
  }[tone];
  const width = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs text-ink-soft">{label}</span>
        <span className="font-mono text-xs tabular text-ink">{Math.round(value)}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-recessed">
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", fill)}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export function Field({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="overline-label block">{label}</span>
      <input
        className="h-10 w-full rounded-md border border-interactive bg-raised px-4 text-base text-ink placeholder:text-interactive transition-colors focus:border-oxblood focus:outline-none focus-visible:ring-2 focus-visible:ring-oxblood focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        {...props}
      />
    </label>
  );
}
