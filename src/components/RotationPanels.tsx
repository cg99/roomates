import Avatar from "./Avatar";
const ACCENT = "#29B6F6";

export function CurrentAssignee({
    hasNames,
    currentName,
    nextOcc,
}: {
    hasNames: boolean;
    currentName: string;
    nextOcc: Date;
}) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
            <h2 className="font-bold text-lg mb-3">Current assignee</h2>
            {hasNames ? (
                <div className="text-xl font-bold flex items-center gap-2">
                    <span
                        className="px-2 py-0.5 rounded-md text-sm"
                        style={{ background: `${ACCENT}15`, color: ACCENT }}
                    >
                        Next{" "}
                        {nextOcc.toLocaleDateString(undefined, {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                    <span className="leading-none">{currentName}</span>
                </div>
            ) : (
                <div className="text-slate-500 dark:text-slate-400">Add names to begin.</div>
            )}
        </div>
    );
}

export function UpcomingRotation({
    items,
}: {
    items: { date: Date; name: string }[];
}) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
            <h2 className="font-bold text-lg mb-3">Upcoming rotation</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
                {items.map((r, idx) => (
                    <li key={idx} className="rounded-xl border overflow-hidden border-slate-200 dark:border-slate-700">
                        <div
                            className="px-3 py-2 border-b text-sm text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                            style={{ background: `#29B6F60D` }}
                        >
                            {r.date.toLocaleDateString(undefined, {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </div>
                        <div className="px-3 py-2 font-semibold flex items-center gap-2">
                            <Avatar name={r.name} /> {r.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
