import React, { useMemo } from 'react';

import { usePagination } from 'components/Pagination/Pagination.context';
import { classBase } from 'components/Pagination/Pagination.utils';
import { buildClassName } from 'helpers/buildClassName';

import { TotalContainer } from './styles';

function Total() {
	// Hooks
	const pagination = usePagination();

	// Memo vars
	const className = useMemo(() => {
		const classes = [classBase('total')];

		return buildClassName(...classes);
	}, []);

	return (
		<TotalContainer $theme={pagination.theme} className={className}>
			<span>
				Página {pagination.currentPage} de {pagination.props.pages}
			</span>
		</TotalContainer>
	);
}

export default Total;
