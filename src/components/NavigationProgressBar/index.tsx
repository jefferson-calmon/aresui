/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { useEffect, useCallback, useRef, memo, useMemo } from 'react';

import progress from 'nprogress';

import * as T from './NavigationProgressBar.types';
import * as U from './NavigationProgressBar.utils';

import { style } from './NavigationProgressBar.styles';

export function NavigationProgressBar({
	color = '#000000',
	startPosition = 0.3,
	stopDelayMs = 200,
	height = 2.5,
	showOnShallow = true,
	options = {},
	nonce,
	transformCSS,
}: T.NavigationProgressBarProps) {
	// Refs
	const timer = useRef<NodeJS.Timeout>();

	// Memo vars
	const cssTransform = useMemo(() => {
		return transformCSS ?? U.defaultTransformCSS({ nonce });
	}, [nonce, transformCSS]);

	// Callbacks
	const routeChangeStart = useCallback(
		(_: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || showOnShallow) {
				progress.set(startPosition);
				progress.start();
			}
		},
		[showOnShallow, startPosition]
	);

	const routeChangeEnd = useCallback(
		(_: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || showOnShallow) {
				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					progress.done(true);
				}, stopDelayMs);
			}
		},
		[showOnShallow, stopDelayMs]
	);

	const routeChangeError = useCallback(
		(_err: Error, _url: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || showOnShallow) {
				if (timer.current) clearTimeout(timer.current);
				timer.current = setTimeout(() => {
					progress.done(true);
				}, stopDelayMs);
			}
		},
		[showOnShallow, stopDelayMs]
	);

	// Effects
	useEffect(() => {
		if (options) progress.configure(options);

		Router.events.on('routeChangeStart', routeChangeStart);
		Router.events.on('routeChangeComplete', routeChangeEnd);
		Router.events.on('routeChangeError', routeChangeError);

		return () => {
			Router.events.off('routeChangeStart', routeChangeStart);
			Router.events.off('routeChangeComplete', routeChangeEnd);
			Router.events.off('routeChangeError', routeChangeError);
		};
	}, [options, routeChangeEnd, routeChangeError, routeChangeStart]);

	return cssTransform(style({ color: color, height: height }));
}

export * from './NavigationProgressBar.types';

export default memo(NavigationProgressBar);
