/* eslint-disable @typescript-eslint/no-explicit-any */

export function parseProps<T extends Record<string, any>>(
	props: T,
	exclude: string[]
) {
	const newProps = Object.entries(props).filter(
		([key]) => !exclude.includes(key)
	);

	return Object.fromEntries(newProps) as T;
}
