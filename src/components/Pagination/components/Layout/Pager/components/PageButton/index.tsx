import React, { useMemo } from 'react';

import { classBase } from 'components/Pagination/Pagination.utils';
import { usePagination } from 'components/Pagination/Pagination.context';
import { buildClassName } from 'helpers/buildClassName';

interface PageButtonProps {
	page: number;
}

function PageButton(props: PageButtonProps) {
	// Hooks
	const pagination = usePagination();

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			classBase('button'),
			classBase('button', 'page'),
			classBase('button', 'page', String(props.page)),
            
			pagination.props.disabled && classBase('button', 'disabled'),

			props.page === pagination.currentPage &&
				classBase('button', 'active'),
		];

		return buildClassName(...classes);
	}, [props.page, pagination]);

	return (
		<button
			className={className}
			disabled={pagination.props.disabled}
			onClick={() => pagination.onChange(props.page)}
		>
			<span>{props.page}</span>
		</button>
	);
}

export default PageButton;
