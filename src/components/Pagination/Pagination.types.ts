import React from 'react';

import { BasePropsWithoutComponentProps, Width } from 'types';

export interface PaginationProps extends BasePropsWithoutComponentProps {
	current?: number;
	pages: number;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	pageData?: any[];

	next?: boolean;
	prev?: boolean;

	width?: Width;
	layout?: Layout[];
	disabled?: boolean;
	maxButtons?: number;

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
