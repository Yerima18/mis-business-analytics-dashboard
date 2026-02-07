"use client";

import { useMemo, useState } from "react";
import KpiCard from "@/components/KpiCard";
import SalesLineChart from "@/components/SalesLineChart";
import RevenueBarChart from "@/components/RevenueBarChart";
import TransactionsTable from "@/components/TransactionsTable";
import FilterPills from "@/components/FilterPills";
import { calcTotals, categories, months, formatMoney } from "@/data/dashboardData";
import { Building2, Globe, LayoutDashboard } from "lucide-react";

const PROFILE = {
  name: "Lafia Adam Bagri",
  github: "https://github.com/Yerima18",
  tagline: "MIS Student · Turkey (International)",
};

export default function Page() {
  const [selectedMonth, setSelectedMonth] = useState<(typeof months)[number]>("All");
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");

  const view = useMemo(() => calcTotals(selectedMonth, selectedCategory), [selectedMonth, selectedCategory]);

  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm">
              <LayoutDashboard />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-neutral-900">Business Analytics Dashboard</h1>
             <p className="hidden text-sm text-neutral-500 sm:block">
                MIS portfolio project · KPI monitoring & reporting
                  </p>
            </div>
          </div>

          {/* Right: Badges + Profile */}
          <div className="hidden items-center gap-2 text-sm text-neutral-600 md:flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
              <Building2 size={16} />
              E-commerce (demo)
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
              <Globe size={16} />
              {PROFILE.tagline}
            </span>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 font-medium text-neutral-900 hover:bg-neutral-50"
              title="Open GitHub profile"
            >
              <span>👤 {PROFILE.name}</span>
              <span className="text-neutral-500">· GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-neutral-900">Business Analytics</h2>
              <p className="text-sm text-neutral-500">Use filters to simulate reporting for management decisions.</p>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <FilterPills
                label="Month"
                options={months}
                value={selectedMonth}
                onChange={(v) => setSelectedMonth(v as any)}
              />
              <FilterPills
                label="Category"
                options={categories}
                value={selectedCategory}
                onChange={(v) => setSelectedCategory(v as any)}
              />
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Revenue"
            value={formatMoney(view.revenue)}
            change={view.growth >= 0 ? `+${view.growth.toFixed(1)}%` : `${view.growth.toFixed(1)}%`}
            subtitle="Compared to previous month"
          />
          <KpiCard title="Orders" value={view.orders.toLocaleString()} change="+6.2%" subtitle="Operational volume" />
          <KpiCard title="Active Customers" value={view.customers.toLocaleString()} change="+3.1%" subtitle="Unique customers" />
          <KpiCard title="Report Status" value="Healthy" change="+0.8%" subtitle="System health indicator" />
        </div>

        {/* Charts */}
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SalesLineChart data={view.monthlyFiltered.map((m) => ({ month: m.month, revenue: m.revenue }))} />
          <RevenueBarChart data={view.revenueByCategory} />
        </div>

        {/* Table */}
        <div className="mt-6">
          <TransactionsTable rows={view.txFiltered} />
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Demo MIS project: built with Next.js + Tailwind + Recharts. Data is mocked for portfolio use.
          </p>

          <p className="flex items-center gap-2">
            Built by <span className="font-medium text-neutral-700">{PROFILE.name}</span> ·{" "}
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
