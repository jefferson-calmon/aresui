import React from 'react';

import { Theme } from 'contexts';
import { DeepPartial, Width } from 'types';

export interface PaginationProps {
	current?: number;
	pages: number;

	next?: boolean;
	prev?: boolean;

	width?: Width;
	layout?: Layout[];
	disabled?: boolean;
	maxButtons?: number;

	theme?: DeepPartial<Theme>;

	customTotal?: (props: PaginationProps) => CustomComponent;
	customPager?: (props: PaginationProps) => CustomComponent;
	customPrevIcon?: () => CustomComponent;
	customNextIcon?: () => CustomComponent;

	onChange?: (page: number) => void;
	onPrev?: () => void;
	onNext?: () => void;
}

type CustomComponent = JSX.Element | React.ReactNode;
export type Layout = 'total' | '-' | 'pager';

export const defaultPropsPagination: Partial<PaginationProps> = {
	next: true,
	prev: true,

	width: 'auto',
	maxButtons: 3,
	layout: ['total', '-', 'pager'],
};
