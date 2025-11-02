const ACCENT = "#29B6F6";

export default function Avatar({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div
            className="w-8 h-8 rounded-full grid place-items-center text-xs font-bold"
            style={{ background: `${ACCENT}20`, color: ACCENT }}
            aria-hidden
        >
            {initials}
        </div>
    );
}
