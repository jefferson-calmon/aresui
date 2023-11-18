/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from 'next/router';
import { useEffect, useCallback, useRef, memo, useMemo } from 'react';

import progress from 'nprogress';
import { mergeObjects } from 'codekit';

import * as T from './NavigationProgressBar.types';
import * as U from './NavigationProgressBar.utils';

import { style } from './NavigationProgressBar.styles';

function NavigationProgressBar(params: T.NavigationProgressBarProps) {
	// Refs
	const timer = useRef<NodeJS.Timeout>();

	// Memo vars
	const props = useMemo(() => {
		return mergeObjects(T.defaultPropsNavigationProgressBar, params);
	}, [params]);

	const transformCSS = useMemo(() => {
		return props.transformCSS ?? U.defaultTransformCSS(props);
	}, [props]);

	// Callbacks
	const routeChangeStart = useCallback(
		(_: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || props.showOnShallow) {
				progress.set(props.startPosition);
				progress.start();
			}
		},
		[props.showOnShallow, props.startPosition]
	);

	const routeChangeEnd = useCallback(
		(_: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || props.showOnShallow) {
				if (timer.current) clearTimeout(timer.current);

				timer.current = setTimeout(() => {
					progress.done(true);
				}, props.stopDelayMs);
			}
		},
		[props.showOnShallow, props.stopDelayMs]
	);

	const routeChangeError = useCallback(
		(_err: Error, _url: string, options: Record<'shallow', boolean>) => {
			if (!options.shallow || props.showOnShallow) {
				if (timer.current) clearTimeout(timer.current);
				timer.current = setTimeout(() => {
					progress.done(true);
				}, props.stopDelayMs);
			}
		},
		[props.showOnShallow, props.stopDelayMs]
	);

	// Effects
	useEffect(() => {
		if (props.options) progress.configure(props.options);

		Router.events.on('routeChangeStart', routeChangeStart);
		Router.events.on('routeChangeComplete', routeChangeEnd);
		Router.events.on('routeChangeError', routeChangeError);

		return () => {
			Router.events.off('routeChangeStart', routeChangeStart);
			Router.events.off('routeChangeComplete', routeChangeEnd);
			Router.events.off('routeChangeError', routeChangeError);
		};
	}, [props.options, routeChangeEnd, routeChangeError, routeChangeStart]);

	return transformCSS(style({ color: props.color, height: props.height }));
}

NavigationProgressBar.defaultProps = T.defaultPropsNavigationProgressBar;

export * from './NavigationProgressBar.types';

export default memo(NavigationProgressBar);
