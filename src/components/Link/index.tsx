import React, { useMemo } from 'react';
import NextLink from 'next/link';

import { config } from 'codekit';

import * as T from './Link.types';
import * as U from './Link.utils';
import { buildClassName } from 'helpers/buildClassName';

config();
export function Link(props: T.LinkProps): JSX.Element {
	// Memo vars
	const className = useMemo(() => {
		const classes = [U.classBase(), props.className];

		return buildClassName(...classes);
	}, [props]);

	return (
		<NextLink href={props.to} {...props} className={className}>
			{props.children && props.children}
		</NextLink>
	);
}

Link.defaultProps = T.defaultPropsLink;

export * from './Link.types';

export default Link;
