import { useMemo } from 'react';

import { merge } from 'codekit';

export function useProps<T extends object, D extends object>(props: T, defaultProps: D) {
	// Memo vars
	const allProps = useMemo(() => {
		return merge(props, defaultProps);
	}, [props, defaultProps]);

	return { props: allProps };
}
