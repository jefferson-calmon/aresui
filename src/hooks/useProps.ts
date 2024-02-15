import { useMemo } from 'react';

import { mergeObjects } from 'codekit';

export function useProps<T extends object, D extends object>(props: T, defaultProps: D) {
	// Memo vars
	const allProps = useMemo(() => {
		return mergeObjects(props, defaultProps);
	}, [props, defaultProps]);

	return { props: allProps };
}
