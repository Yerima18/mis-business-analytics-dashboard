"use client";

type Props = {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
};

export default function FilterPills({ label, options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-neutral-500">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={[
                "rounded-full border px-3 py-1 text-sm transition",
                active
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
              ].join(" ")}
              type="button"
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
