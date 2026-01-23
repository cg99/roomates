import { useMemo, useState } from "react";
import { useFirebaseStorage } from "./hooks/useFirebaseStorage";
import { useTheme } from "./hooks/useTheme";
import {
  startOfDay,
  firstOccurrenceOnOrAfter,
  nextDowOnOrAfter,
  addDays,
  weeksBetween,
} from "./utils/date";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import PeopleList from "./components/PeopleList";
// import SettingsPanel from "./components/SettingsPanel";

const ACCENT = "#29B6F6";


export default function App() {
  // --- state
  const [names, setNames] = useFirebaseStorage<string[]>("bin:names", [
    "Umesh",
    "Lokendra",
    "Dirgha",
    "Yamuna",
    "Bhawana",
  ]);
  const [newName, setNewName] = useState("");
  const [weekday] = useFirebaseStorage<number>("bin:weekday", 3); // default Wed
  const [pivotIso] = useFirebaseStorage<string>(
    "bin:pivot",
    new Date().toISOString().slice(0, 10)
  );
  const { theme, setTheme } = useTheme();

  // --- derived
  const pivotDate = useMemo(() => startOfDay(new Date(pivotIso)), [pivotIso]);
  const firstOcc = useMemo(
    () => firstOccurrenceOnOrAfter(pivotDate, weekday),
    [pivotDate, weekday]
  );
  const nextOcc = useMemo(() => nextDowOnOrAfter(new Date(), weekday), [weekday]);

  const currentIndex = useMemo(() => {
    if (!names.length) return -1;
    const n = Math.max(0, weeksBetween(firstOcc, nextOcc));
    return ((n % names.length) + names.length) % names.length;
  }, [firstOcc, nextOcc, names.length]);

  const nextFive = useMemo(() => {
    const items: { date: Date; name: string }[] = [];
    if (!names.length) return items;
    const start = nextOcc;
    for (let i = 0; i < Math.max(5, names.length); i++) {
      const occ = addDays(start, i * 7);
      const idx = (currentIndex + i) % names.length;
      items.push({ date: occ, name: names[idx] });
    }
    return items;
  }, [names, nextOcc, currentIndex]);

  // --- actions
  function add() {
    const n = newName.trim();
    if (!n) return;
    setNames([...names, n]);
    setNewName("");
  }
  function remove(i: number) {
    setNames(names.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= names.length) return;
    const arr = [...names];
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setNames(arr);
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100">
      <Header themeNode={<ThemeToggle theme={theme} setTheme={setTheme} />} />

      <main className="max-w-5xl mx-auto px-6 py-6">
        <PeopleList
          names={names}
          add={add}
          remove={remove}
          move={move}
          newName={newName}
          setNewName={setNewName}
          accent={ACCENT}
          upcomingItems={nextFive}
        />
      </main>
    </div>
  );
}
