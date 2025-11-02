const ACCENT = "#29B6F6";

export default function Header({
    themeNode,
}: {
    themeNode: React.ReactNode;
}) {
    return (
        <header
            className="relative overflow-hidden"
            style={{
                background: `radial-gradient(1200px 400px at 0% -10%, ${ACCENT}33, transparent)`,
            }}
        >
            <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-2xl grid place-items-center bg-white dark:bg-slate-900 shadow"
                            style={{ color: ACCENT }}
                        >
                            🗑️
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold">Burwood home Bin Duty</h1>
                            <p className="text-slate-600 dark:text-slate-400">
                                Weekly rotation
                            </p>
                        </div>
                    </div>
                    {themeNode}
                </div>
            </div>
        </header>
    );
}
