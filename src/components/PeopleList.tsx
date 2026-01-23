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
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
      <h2 className="font-bold text-lg mb-3">People</h2>
      
      <div className="space-y-2">
        {names.map((name, i) => {
          const personDates = upcomingItems
            .filter(item => item.name === name)
            .map(item => item.date);
          const isFirst = i === 0;
          
          return (
            <div
              key={i}
              className={`p-3 rounded-lg border transition ${
                isFirst
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-500"
                  : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Avatar name={name} />
                <span className="flex-1 font-medium">{name}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    aria-label="Move up"
                    title="Move up"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === names.length - 1}
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
