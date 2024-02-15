import React from 'react';

import { config } from 'codekit';

import * as T from './Pagination.types';
import * as C from './Pagination.components';
import * as U from './Pagination.utils';
import * as Ctx from './Pagination.context';

import { PaginationContainer } from './Pagination.styles';

config();

function PaginationComponent() {
	const pagination = Ctx.usePagination();

	return (
		<PaginationContainer
			className={U.classBase()}
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

export function Pagination(props: T.PaginationProps) {
	return (
		<Ctx.PaginationProvider props={props}>
			<PaginationComponent />
		</Ctx.PaginationProvider>
	);
}

Pagination.defaultProps = T.defaultPropsPagination;

export * from './Pagination.types';

export default Pagination;
