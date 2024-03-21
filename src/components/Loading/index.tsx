import React, { useMemo } from 'react';

import { mergeObjects } from 'codekit';

import * as T from './Loading.types';
import * as U from './Loading.utils';
import Spinner from './components/Spinner';
import Bar from './components/Bar';
import { useAresUI } from 'contexts';
import { filterHTMLProps } from 'helpers/filterHTMLProps';

import { LoadingContainer } from './Loading.styles';

export function Loading(
	props: T.LoadingProps = T.defaultPropsLoading
): JSX.Element {
	// Hooks
	const aresui = useAresUI();

	// Memo Vars
	const theme = useMemo(() => {
		return mergeObjects(aresui.theme, props.theme ?? {});
	}, [aresui.theme, props.theme]);

	return (
		<LoadingContainer
			className={U.classBase()}
			{...filterHTMLProps(props)}
			$theme={theme}
		>
			{!props.custom && props.type === 'spinner' && (
				<Spinner {...props} theme={theme} />
			)}

			{!props.custom && props.type === 'bar' && (
				<Bar {...props} theme={theme} />
			)}

			{props.custom && (
				<div className={U.classBase('custom-loader')}>
					<props.custom />
				</div>
			)}
		</LoadingContainer>
	);
}

export * from './Loading.types';

export default Loading;
