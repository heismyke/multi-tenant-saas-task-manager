import type { ReactNode } from "react";

export const AuthLayout = ({ children, title, subtitle }: { children: ReactNode; title: string; subtitle: string }) => {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-ink">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center">
        <div className="grid w-full overflow-hidden rounded-lg border border-line bg-white shadow-sm md:grid-cols-[1fr_1.2fr]">
          <div className="border-b border-line bg-ink p-8 text-white md:border-b-0 md:border-r">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-200">Tenant Tasks</p>
            <h1 className="mt-5 text-3xl font-semibold leading-tight">{title}</h1>
            <p className="mt-4 text-sm leading-6 text-slate-200">{subtitle}</p>
          </div>
          <div className="p-6 sm:p-8">{children}</div>
        </div>
      </section>
    </main>
  );
};

