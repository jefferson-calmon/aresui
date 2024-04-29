import React from 'react';

import { NavigationProgressBarProps } from './NavigationProgressBar.types';

export function defaultTransformCSS(props: {
    nonce: NavigationProgressBarProps['nonce']
}) {
	const transformCSS = (css: string) => (
		<style nonce={props.nonce}>
			{css}
		</style>
	);

	return transformCSS;
}
