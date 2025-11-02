import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
	const [theme, setTheme] = useLocalStorage<Theme>("bin:theme", "system");
	useEffect(() => {
		const root = document.documentElement;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const apply = (t: Theme) => {
			const isDark = t === "dark" || (t === "system" && mq.matches);
			root.classList.toggle("dark", isDark);
		};
		apply(theme);
		const onChange = () => theme === "system" && apply("system");
		mq.addEventListener?.("change", onChange);
		return () => mq.removeEventListener?.("change", onChange);
	}, [theme]);
	return { theme, setTheme };
}
