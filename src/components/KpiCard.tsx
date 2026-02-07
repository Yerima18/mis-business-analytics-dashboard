import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Props = {
  title: string;
  value: string;
  change?: string; // "+12.4%"
  subtitle?: string;
};

export default function KpiCard({ title, value, change, subtitle }: Props) {
  const isUp = (change ?? "").trim().startsWith("+");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
         <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">{value}</p>
          {subtitle ? <p className="mt-1 text-xs text-neutral-500">{subtitle}</p> : null}
        </div>

        {change ? (
          <div
            className={[
              "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs",
              isUp ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700",
            ].join(" ")}
          >
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{change}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
