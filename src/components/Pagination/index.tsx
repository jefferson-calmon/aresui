import React from 'react';

import { config } from 'codekit';

import * as T from './Pagination.types';
import * as C from './Pagination.components';
import * as Ctx from './Pagination.context';

import { PaginationContainer } from './Pagination.styles';

config();

function Pagination() {
	const pagination = Ctx.usePagination();

	return (
		<PaginationContainer
			$theme={pagination.theme}
			$width={pagination.props.width}
		>
			{pagination.props.layout?.map((layout) => {
				const LayoutComponent = C.layout[layout];

				return <LayoutComponent />;
			})}
		</PaginationContainer>
	);
}

function PaginationWithContext(props: T.PaginationProps) {
	return (
		<Ctx.PaginationProvider props={props}>
			<Pagination />
		</Ctx.PaginationProvider>
	);
}

PaginationWithContext.defaultProps = T.defaultPropsPagination;

export * from './Pagination.types';

export default PaginationWithContext;
