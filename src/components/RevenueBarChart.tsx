"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

type Row = {
  category: string;
  revenue: number;
};

export default function RevenueBarChart({ data }: { data: Row[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-neutral-500">Category Performance</p>
        <h3 className="text-lg font-semibold text-neutral-900">Revenue by Category</h3>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
