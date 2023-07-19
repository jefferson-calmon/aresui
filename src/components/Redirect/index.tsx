import { useRouter } from 'next/router';

import { useIsomorphicLayoutEffect } from 'codekit';

import * as T from './Redirect.types';

export function Redirect(props: T.RedirectProps): JSX.Element | null {
	// Hooks
	const router = useRouter();

	useIsomorphicLayoutEffect(() => {
		setTimeout(() => {
			if (props.toBack) return router.back();

			if (props.to) return router.push(props.to);
		}, props.delay);
	}, [props.delay, props.toBack]);

	return null;
}

Redirect.defaultProps = T.defaultPropsRedirect;

export * from './Redirect.types';

export default Redirect;
