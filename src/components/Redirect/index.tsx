import { useRouter } from 'next/router';

import { debounce, useIsomorphicLayoutEffect } from 'codekit';

import * as T from './Redirect.types';

export function Redirect({
	to = '',
	delay = 0,
	toBack = false,
	transitionOptions: options = {},
}: T.RedirectProps): JSX.Element | null {
	// Hooks
	const router = useRouter();

	useIsomorphicLayoutEffect(() => {
		debounce(() => {
			if (toBack) return router.back();

			if (to) return router.push(to, undefined, options);
		}, delay);
	}, [delay, toBack, to]);

	return null;
}

export * from './Redirect.types';

export default Redirect;
