const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Segmented({
    value,
    onChange,
}: {
    value: number;
    onChange: (n: number) => void;
}) {
    return (
        <div className="grid grid-cols-7 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            {WEEKDAYS.map((label, i) => (
                <button
                    key={i}
                    onClick={() => onChange(i)}
                    className={`px-2 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${value === i
                        ? "bg-sky-500 text-white"
                        : "bg-white hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                        }`}
                    aria-pressed={value === i}
                >
                    {label.slice(0, 3)}
                </button>
            ))}
        </div>
    );
}
