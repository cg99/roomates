export const startOfDay = (d: Date) =>
	new Date(d.getFullYear(), d.getMonth(), d.getDate());

export function addDays(d: Date, n: number) {
	const x = new Date(d);
	x.setDate(x.getDate() + n);
	return x;
}

export function nextDowOnOrAfter(from: Date, dow: number) {
	// JS: 0=Sun..6=Sat
	let d = startOfDay(from);
	while (d.getDay() !== dow) d = addDays(d, 1);
	return d;
}

export const firstOccurrenceOnOrAfter = (pivot: Date, dow: number) =>
	nextDowOnOrAfter(pivot, dow);

export function weeksBetween(a: Date, b: Date) {
	const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
	return Math.floor(ms / (7 * 24 * 60 * 60 * 1000));
}
