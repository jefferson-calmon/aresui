import React from 'react';

import * as T from './Loading.types';
import * as U from './Loading.utils';
import Spinner from './components/Spinner';
import Bar from './components/Bar';
import { useTheme } from 'hooks/useTheme';

import { LoadingContainer } from './Loading.styles';

export function Loading({
	type = 'spinner',
	size = 24,
	duration = 1500,
	spinner = {
		strokeWidth: 5,
	},
	bar = {
		width: 150,
		height: 4,
	},
	custom,
	...props
}: T.LoadingProps): JSX.Element {
	// Hooks
	const theme = useTheme(props.theme);

	// Common vars
	const Custom = custom;

	return (
		<LoadingContainer className={U.classBase()} {...props} $theme={theme}>
			{!Custom && type === 'spinner' && (
				<Spinner {...{ size, duration, spinner, bar }} theme={theme} />
			)}

			{!Custom && type === 'bar' && (
				<Bar {...{ size, duration, spinner, bar }} theme={theme} />
			)}

			{Custom && (
				<div className={U.classBase('custom-loader')}>
					<Custom />
				</div>
			)}
		</LoadingContainer>
	);
}

export * from './Loading.types';

export default Loading;
