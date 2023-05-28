import React, { useMemo } from 'react';
import NextLink from 'next/link';

import { config } from 'pandora-tools';

import * as T from './Link.types';

config();
export function Link(props: T.LinkProps): JSX.Element {
	// Memo vars
	const className = useMemo(() => {
		const classes = ['nextui-link', props.className]
			.compact()
			.uniq()
			.join(' ');

		return classes;
	}, [props]);

	return (
		<NextLink href={props.to} {...props} className={className}>
			{props.children && props.children}
		</NextLink>
	);
}

Link.defaultProps = T.defaultProps;

export * from './Link.types';

export default Link;
