import React from 'react';

import { config } from 'codekit';

import * as T from './Pagination.types';
import * as C from './Pagination.components';
import * as U from './Pagination.utils';
import * as Ctx from './Pagination.context';
import { useTheme } from 'hooks/useTheme';

import { PaginationContainer } from './Pagination.styles';

config();

export function Pagination({
	current,
	pages,
	next = true,
	prev = true,
	width = 'auto',
	layout = ['total', '-', 'pager'],
	disabled,
	maxButtons = 3,
	customTotal,
	customPager,
	customPrevIcon,
	customNextIcon,
	onChange,
	onPrev,
	onNext,
	...props
}: T.PaginationProps) {
	// Hooks
	const theme = useTheme(props.theme);

	return (
		<Ctx.PaginationProvider
			props={{
				pages,
				current,
				next,
				prev,
				width,
				layout,
				disabled,
				maxButtons,
				customTotal,
				customPager,
				customPrevIcon,
				customNextIcon,
				onChange,
				onPrev,
				onNext,
				theme,
			}}
		>
			<PaginationComponent />
		</Ctx.PaginationProvider>
	);
}

function PaginationComponent() {
	// Hooks
	const pagination = Ctx.usePagination();

	return (
		<PaginationContainer
			className={U.classBase()}
			$theme={pagination.theme}
			$width={pagination.props.width}
		>
			{pagination.props.layout.map((layout) => {
				const LayoutComponent = C.layout[layout];

				return <LayoutComponent />;
			})}
		</PaginationContainer>
	);
}

export * from './Pagination.types';

export default Pagination;
