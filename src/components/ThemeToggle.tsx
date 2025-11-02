import type { Theme } from "../hooks/useTheme";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
    // Add a small filled center so the icon stays visible on light backgrounds
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
            <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5 5l-1.4-1.4M20.4 20.4 19 19M5 19l-1.4 1.4M20.4 3.6 19 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
    );
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden {...props}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
    );
}

export default function ThemeToggle({
    theme,
    setTheme,
}: {
    theme: Theme;
    setTheme: (t: Theme) => void;
}) {
    const baseBtn =
        "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-sm transition " +
        "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 " +
        "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";
    const active =
        "bg-sky-500 border-sky-500 dark:text-white hover:bg-sky-500 dark:hover:bg-sky-500";

    return (
        <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
                <button
                    className={`${baseBtn} ${theme === "light" ? active : ""}`}
                    onClick={() => setTheme("light")}
                    aria-label="Use light theme"
                    title="Light"
                >
                    <SunIcon />
                    <span className="hidden md:inline">Light</span>
                </button>
                <button
                    className={`${baseBtn} ${theme === "dark" ? active : ""}`}
                    onClick={() => setTheme("dark")}
                    aria-label="Use dark theme"
                    title="Dark"
                >
                    <MoonIcon />
                    <span className="hidden md:inline">Dark</span>
                </button>
                <button
                    className={`${baseBtn} ${theme === "system" ? active : ""}`}
                    onClick={() => setTheme("system")}
                    aria-label="Follow system theme"
                    title="System"
                >
                    <span className="font-medium">System</span>
                </button>
            </div>

            {/* Compact icon-only toggle for mobile */}
            <button
                className={`${baseBtn} sm:hidden ${theme === "light" || theme === "dark" ? active : ""}`}
                onClick={() =>
                    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")
                }
                aria-label="Toggle theme"
                title={`Theme: ${theme}`}
            >
                {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </button>
        </div>
    );
}
