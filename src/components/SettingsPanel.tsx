import Segmented from "./Segmented";

export default function SettingsPanel({
  weekday,
  setWeekday,
  pivotIso,
  setPivotIso,
}: {
  weekday: number;
  setWeekday: (n: number) => void;
  pivotIso: string;
  setPivotIso: (s: string) => void;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-5">
      <h2 className="font-bold text-lg mb-3">Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Collection Day
          </label>
          <Segmented value={weekday} onChange={setWeekday} />
        </div>
        
        <div>
          <label 
            htmlFor="pivot-date"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Pivot Date
          </label>
          <input
            id="pivot-date"
            type="date"
            value={pivotIso}
            onChange={(e) => setPivotIso(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 focus:ring-offset-white dark:focus:ring-offset-slate-900"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            The starting date for the rotation calculation
          </p>
        </div>
      </div>
    </div>
  );
}
