import Avatar from "./Avatar";

const ACCENT = "#29B6F6";

export default function PeopleList({
  names,
  move,
  upcomingItems,
}: {
  names: string[];
  add: () => void;
  remove: (i: number) => void;
  move: (i: number, dir: -1 | 1) => void;
  newName: string;
  setNewName: (s: string) => void;
  accent?: string;
  upcomingItems: { date: Date; name: string }[];
}) {
  // create a view of people sorted by their next upcoming date (ascending)
  const peopleView = names
    .map((name, idx) => {
      const dates = upcomingItems
        .filter((item) => item.name === name)
        .map((item) => item.date)
        .sort((a, b) => +a - +b);
      const nextDate = dates.length ? dates[0] : null;
      return { name, originalIndex: idx, dates, nextDate };
    })
    .sort((a, b) => {
      if (a.nextDate === null && b.nextDate === null) return 0;
      if (a.nextDate === null) return 1;
      if (b.nextDate === null) return -1;
      return +a.nextDate - +b.nextDate;
    });

  // pick the person with the earliest nextDate to highlight (if any)
  const highlightedOriginalIndex = (() => {
    let best: number | null = null;
    let bestTime = Infinity;
    for (const p of peopleView) {
      if (p.nextDate === null) continue;
      const t = +p.nextDate;
      if (t < bestTime) {
        bestTime = t;
        best = p.originalIndex;
      }
    }
    return best;
  })();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
      <h2 className="font-bold text-lg mb-3">People</h2>
      
      <div className="space-y-2">
        {peopleView.map((p, i) => {
          const personDates = p.dates;
          const isFirst = highlightedOriginalIndex !== null && p.originalIndex === highlightedOriginalIndex;

          return (
            <div
              key={p.originalIndex}
              className={`p-3 rounded-lg border transition ${
                isFirst
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-500"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={p.name} />
                <span className="flex-1 font-medium">{p.name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(p.originalIndex, -1)}
                    disabled={p.originalIndex === 0}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Move up"
                    title="Move up"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => move(p.originalIndex, 1)}
                    disabled={p.originalIndex === names.length - 1}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Move down"
                    title="Move down"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              {personDates.length > 0 && (
                <div className="flex flex-wrap gap-1.5 ml-10">
                  {personDates.map((date, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: `${ACCENT}15`, color: ACCENT }}
                    >
                      {date.toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
