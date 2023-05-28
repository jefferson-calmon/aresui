import React, { useMemo } from 'react';
import NextHead from 'next/head';

import { config } from 'pandora-tools';

import * as T from './Head.types';
import { useAresUI } from 'contexts';

config();

export function Head(props: T.HeadProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// Memo vars
	const title = useMemo(() => {
		const separator = props.titleSeparator;
		const sentences = [props.title, aresUI.config.app.name].compact();

		return sentences.join(` ${separator} `);
	}, [aresUI.config.app.name, props.title]);

	return (
		<NextHead>
			<title>{title}</title>

			{props.children}
		</NextHead>
	);
}

Head.defaultProps = T.defaultPropsHead;

export * from './Head.types'

export default Head;
