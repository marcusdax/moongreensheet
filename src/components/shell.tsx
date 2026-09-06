import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AuctumSeal } from "./auctum-mark";
import { cn } from "@/lib/cn";
import { useLedger } from "@/lib/store";

const NAV = [
  { to: "/", label: "Cover" },
  { to: "/the-craft", label: "The Craft" },
  { to: "/ledger", label: "The Ledger" },
  { to: "/crm", label: "CRM" },
  { to: "/scan", label: "Scan" },
  { to: "/trust", label: "Trust" },
  { to: "/ecosystem", label: "Ecosystem" },
] as const;

export function FolioShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const markReady = useLedger((s) => s.markReady);

  useEffect(() => {
    void useLedger.persist.rehydrate();
    markReady();
  }, [markReady]);

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-raised focus:px-3 focus:py-2"
      >
        Skip to record
      </a>
      <header className="sticky top-0 z-40 border-b border-hairline bg-ink text-raised">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3 text-raised">
            <span className="text-raised">
              <AuctumSeal size={36} inverse />
            </span>
            <span>
              <span className="block font-display text-lg leading-none tracking-tight">
                Auctum Ledger
              </span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.18em] text-brass">
                by Auctum
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active =
                item.to === "/"
                  ? pathname === "/"
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-oxblood text-raised"
                      : "text-raised/80 hover:bg-raised/10 hover:text-raised",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-raised/20 lg:hidden"
            aria-expanded={open}
            aria-label="Open navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-raised" />
              <span className="block h-px w-5 bg-raised" />
              <span className="block h-px w-5 bg-raised" />
            </span>
          </button>
        </div>
        {open ? (
          <div className="border-t border-raised/15 px-4 py-3 lg:hidden">
            <div className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-3 text-sm text-raised"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <div id="main">
        <Outlet />
      </div>
      <footer className="border-t border-hairline bg-raised">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-soft md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-base text-ink">Auctum Ledger</p>
            <p className="mt-1">A product of Auctum. Value is co-created, not extracted.</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em]">
            Folio 2026 · en-US · es-MX · pt-BR · zh-CN
          </p>
        </div>
      </footer>
    </div>
  );
}
