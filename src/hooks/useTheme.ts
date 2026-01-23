import { useEffect, useRef } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
	const [theme, setTheme] = useLocalStorage<Theme>("bin:theme", "system");
	const themeRef = useRef(theme);
	themeRef.current = theme; // Keep ref in sync
	
	useEffect(() => {
		const root = document.documentElement;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = (t: Theme) => {
			const isDark = t === "dark" || (t === "system" && mq.matches);
			root.classList.toggle("dark", isDark);
		};
		apply(theme);
		const onChange = () => {
			// Use ref to get current theme value (not stale closure)
			if (themeRef.current === "system") {
				apply("system");
			}
		};
		mq.addEventListener?.("change", onChange);
		return () => mq.removeEventListener?.("change", onChange);
	}, [theme]);
	return { theme, setTheme };
}
