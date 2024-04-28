import React, { useMemo } from 'react';
import NextHead from 'next/head';

import { config } from 'codekit';

import * as T from './Head.types';
import { useAresUI } from 'contexts';

config();

export function Head({
	title = '',
	titleSeparator = '-',
	description,
	keywords = [],
	robots = [],
	author,
	language,
	children,
}: T.HeadProps): JSX.Element {
	// Hooks
	const { config } = useAresUI();

	// Memo vars
	const titleFormatted = useMemo(() => {
		const separator = titleSeparator.trim();
		const sentences = [title, config.app.name].compact();

		return sentences.join(` ${separator} `);
	}, [config.app.name, title, titleSeparator]);

	return (
		<NextHead>
			<title>{titleFormatted}</title>

			<meta name="title" content={titleFormatted} />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords.uniq().join(', ')} />
			<meta name="robots" content={robots.uniq().join(', ')} />
			<meta name="language" content={language} />
			<meta name="author" content={author} />

			{children}
		</NextHead>
	);
}

export * from './Head.types';

export default Head;
