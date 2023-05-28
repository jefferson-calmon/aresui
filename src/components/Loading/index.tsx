import React, { useMemo } from 'react';

import { mergeObjects } from 'pandora-tools';

import * as T from './Loading.types';
import { useNextUI } from 'contexts';

import { LoadingContainer } from './Loading.styles';

export function Loading(props: T.LoadingProps): JSX.Element {
	// Hooks
	const nextUI = useNextUI();

	// Memo Vars
	const theme = useMemo(() => {
		return mergeObjects(nextUI.theme, props.theme);
	}, [props.theme]);

	return (
		<LoadingContainer className="nextui-loading" {...props} theme={theme}>
			{!props.custom && (
				<svg viewBox="0 0 50 50">
					<circle
						className="path-spinner"
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
				<div>
					<props.custom />
				</div>
			)}
		</LoadingContainer>
	);
}

Loading.defaultProps = T.defaultProps;

export * from './Loading.types';

export default Loading;
