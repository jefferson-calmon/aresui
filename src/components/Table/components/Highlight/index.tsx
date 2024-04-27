import React from 'react';

import Highlighter, { HighlighterProps } from 'react-highlight-words';

import { useTable } from '../../Table.context';

interface HighlightProps {
	// tag: keyof HTMLElementTagNameMap;
	children: string | JSX.Element | React.ReactNode;

	highlightProps?: Partial<Omit<HighlighterProps, 'searchWords'>>;
}

function Highlight<T>(props: HighlightProps) {
	// Hooks
	const table = useTable<T>();

	return (
		<Highlighter
			searchWords={[table.search]}
			autoEscape={true}
			textToHighlight={String(props.children)}
			highlightTag="mark"
			caseSensitive={false}
			{...props.highlightProps}
		/>
	);
}

export default Highlight;
