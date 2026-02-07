export type Transaction = {
  id: string;
  date: string;
  customer: string;
  channel: "Website" | "Mobile" | "Partner";
  category: "Electronics" | "Fashion" | "Home" | "Beauty";
  amount: number;
  status: "Paid" | "Pending" | "Refunded";
};

export type MonthlyPoint = {
  month: string; // "Jan"...
  revenue: number;
  orders: number;
};

export const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"] as const;

export const months = [
  "All",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const monthly: MonthlyPoint[] = [
  { month: "Jan", revenue: 9200, orders: 210 },
  { month: "Feb", revenue: 10400, orders: 240 },
  { month: "Mar", revenue: 9800, orders: 225 },
  { month: "Apr", revenue: 12150, orders: 270 },
  { month: "May", revenue: 13900, orders: 310 },
  { month: "Jun", revenue: 15500, orders: 340 },
  { month: "Jul", revenue: 14800, orders: 330 },
  { month: "Aug", revenue: 16200, orders: 360 },
  { month: "Sep", revenue: 17150, orders: 380 },
  { month: "Oct", revenue: 18300, orders: 410 },
  { month: "Nov", revenue: 19650, orders: 440 },
  { month: "Dec", revenue: 21400, orders: 480 },
];

export const revenueByCategoryBase = [
  { category: "Electronics", revenue: 52000 },
  { category: "Fashion", revenue: 39000 },
  { category: "Home", revenue: 28000 },
  { category: "Beauty", revenue: 17000 },
] as const;

export const transactions: Transaction[] = [
  { id: "TRX-1001", date: "2026-01-22", customer: "Ayşe Y.", channel: "Mobile", category: "Fashion", amount: 249.9, status: "Paid" },
  { id: "TRX-1002", date: "2026-01-23", customer: "Mehmet K.", channel: "Website", category: "Electronics", amount: 1799, status: "Paid" },
  { id: "TRX-1003", date: "2026-01-23", customer: "Elif A.", channel: "Partner", category: "Home", amount: 699.5, status: "Pending" },
  { id: "TRX-1004", date: "2026-01-24", customer: "John D.", channel: "Website", category: "Beauty", amount: 129.99, status: "Paid" },
  { id: "TRX-1005", date: "2026-01-25", customer: "Fatma S.", channel: "Mobile", category: "Electronics", amount: 999, status: "Refunded" },
  { id: "TRX-1006", date: "2026-01-25", customer: "Ali Ç.", channel: "Website", category: "Home", amount: 349.0, status: "Paid" },
  { id: "TRX-1007", date: "2026-01-26", customer: "Sofia L.", channel: "Partner", category: "Fashion", amount: 459.0, status: "Paid" },
  { id: "TRX-1008", date: "2026-01-27", customer: "Mustafa E.", channel: "Mobile", category: "Beauty", amount: 89.5, status: "Pending" },
];

export function formatMoney(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export function calcTotals(selectedMonth: string, selectedCategory: string) {
  const monthFilter = selectedMonth === "All" ? null : selectedMonth;
  const categoryFilter = selectedCategory === "All" ? null : selectedCategory;

  const monthlyFiltered = monthFilter ? monthly.filter((m) => m.month === monthFilter) : monthly;
  const revenue = monthlyFiltered.reduce((sum, m) => sum + m.revenue, 0);
  const orders = monthlyFiltered.reduce((sum, m) => sum + m.orders, 0);

  const txFiltered = transactions.filter((t) => (categoryFilter ? t.category === categoryFilter : true));
  const customers = Math.max(
  120,
  new Set(txFiltered.map((t) => t.customer)).size * 15
  );


  const idx = monthFilter ? monthly.findIndex((m) => m.month === monthFilter) : monthly.length - 1;
  const prev = idx > 0 ? monthly[idx - 1].revenue : monthly[0].revenue;
  const curr = monthly[idx]?.revenue ?? monthly[monthly.length - 1].revenue;
  const growth = prev ? ((curr - prev) / prev) * 100 : 0;

  const monthScale = monthFilter ? curr / monthly[monthly.length - 1].revenue : 1;
  const revenueByCategory = revenueByCategoryBase.map((c) => ({
    category: c.category,
    revenue: Math.round(c.revenue * monthScale),
  }));

  return {
    revenue,
    orders,
    customers,
    growth,
    monthlyFiltered,
    txFiltered: txFiltered.slice(0, 8),
    revenueByCategory,
  };
}
