import { useRef } from 'react';

export function useComponentId(prefix = 'aresui') {
	const idRef = useRef<string>(
		`${prefix}-${Math.random().toString(36).substr(2, 9)}`
	);

	return idRef.current;
}
