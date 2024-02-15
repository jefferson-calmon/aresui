import React, { useMemo } from 'react';

import { mergeObjects } from 'codekit';

import * as T from './Loading.types';
import * as U from './Loading.utils';
import { useAresUI } from 'contexts';

import { LoadingContainer } from './Loading.styles';
import { parseProps } from 'helpers/parseProps';

export function Loading(props: T.LoadingProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// Memo Vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	return (
		<LoadingContainer
			className={U.classBase()}
			{...parseProps(props, T.excludeProps)}
			UITheme={theme}
		>
			{!props.custom && (
				<svg viewBox="0 0 50 50">
					<circle
						className={U.classBase('path-spinner')}
						cx={25}
						cy={25}
						r={20}
						fill="none"
						strokeWidth={props.strokeWidth}
						stroke={theme.colors?.primary}
					/>
				</svg>
			)}

			{props.custom && (
				<div className={U.classBase('custom-loader')}>
					<props.custom />
				</div>
			)}
		</LoadingContainer>
	);
}

Loading.defaultProps = T.defaultPropsLoading;

export * from './Loading.types';

export default Loading;
