import React, { useMemo } from 'react';

import { classBase } from 'components/Pagination/Pagination.utils';
import { usePagination } from 'components/Pagination/Pagination.context';
import { buildClassName } from 'helpers/buildClassName';
import { Ellipsis } from 'icons';

function EllipsisButton() {
	// Hooks
	const pagination = usePagination();

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			classBase('button'),
			classBase('button', 'ellipsis'),
			pagination.props.disabled && classBase('button', 'disabled'),
		];

		return buildClassName(...classes);
	}, [pagination.props.disabled]);

	return (
		<button className={className} disabled={pagination.props.disabled}>
			<Ellipsis />
		</button>
	);
}

export default EllipsisButton;
