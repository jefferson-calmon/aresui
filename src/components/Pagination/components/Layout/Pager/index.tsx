import React, { useMemo } from 'react';

import NavigationButton from './components/NavigationButton';
import PageButton from './components/PageButton';
import EllipsisButton from './components/EllipsisButton';
import { usePagination } from 'components/Pagination/Pagination.context';
import { classBase } from 'components/Pagination/Pagination.utils';
import { buildClassName } from 'helpers/buildClassName';

import { PagerContainer } from './styles';

function Pager() {
	// Hooks
	const pagination = usePagination();

	// Memo vars
	const buttons = useMemo(() => {
		const current = pagination.currentPage;
		const max = pagination.props.maxButtons ?? 1;
		const increment = Math.ceil(current / max);

		if (max === 0) return [];

		return Array.new(pagination.props.pages)
			.map((id, index) => ({ key: id, page: index + 1 }))
			.slice(max * increment - max, max * increment);
	}, [pagination]);

	const className = useMemo(() => {
		const classes = [classBase('pager')];

		return buildClassName(...classes);
	}, []);

	return (
		<PagerContainer $theme={pagination.theme} className={className}>
			<NavigationButton type="prev" />

			{buttons.length > 0 &&
				pagination.currentPage >
					Number(pagination.props.maxButtons) && (
					<>
						<PageButton page={1} />
						<EllipsisButton />
					</>
				)}

			{buttons.map(({ key, page }) => (
				<PageButton key={key} page={page} />
			))}

			{buttons.length > 0 &&
				buttons.last().page !== pagination.props.pages && (
					<>
						<EllipsisButton />
						<PageButton page={pagination.props.pages} />
					</>
				)}

			<NavigationButton type="next" />
		</PagerContainer>
	);
}

export default Pager;
