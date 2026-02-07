import type { Transaction } from "@/data/dashboardData";
import { formatMoney } from "@/data/dashboardData";

function pill(status: Transaction["status"]) {
  if (status === "Paid") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "Pending") return "border-amber-200 bg-amber-50 text-amber-700";
  return "border-rose-200 bg-rose-50 text-rose-700";
}

export default function TransactionsTable({ rows }: { rows: Transaction[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-sm text-neutral-500">Operations</p>
        <h3 className="text-lg font-semibold text-neutral-900">Recent Transactions</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="text-left text-neutral-500">
              <th className="py-2 pr-4 font-medium">ID</th>
              <th className="py-2 pr-4 font-medium">Date</th>
              <th className="py-2 pr-4 font-medium">Customer</th>
              <th className="py-2 pr-4 font-medium">Channel</th>
              <th className="py-2 pr-4 font-medium">Category</th>
              <th className="py-2 pr-4 font-medium">Amount</th>
              <th className="py-2 pr-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-100">
            {rows.map((t) => (
              <tr key={t.id} className="text-neutral-700">
                <td className="py-3 pr-4 font-medium text-neutral-900">{t.id}</td>
                <td className="py-3 pr-4">{t.date}</td>
                <td className="py-3 pr-4">{t.customer}</td>
                <td className="py-3 pr-4">{t.channel}</td>
                <td className="py-3 pr-4">{t.category}</td>
                <td className="py-3 pr-4">{formatMoney(t.amount)}</td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${pill(t.status)}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
