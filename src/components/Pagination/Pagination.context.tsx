/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useMemo } from 'react';

import * as T from './Pagination.types';
import { useControlledState } from 'hooks/useControlledState';
import { Theme } from 'contexts';
import { usePrevious } from 'codekit';

interface PaginationContextProps {
	children: React.ReactNode;

	props: T.PaginationProps & {
		next: Required<T.PaginationProps>['next'];
		prev: Required<T.PaginationProps>['prev'];
		width: Required<T.PaginationProps>['width'];
		layout: Required<T.PaginationProps>['layout'];
		maxButtons: Required<T.PaginationProps>['maxButtons'];
		theme: Theme;
	};
}

export interface PaginationContextData
	extends Omit<PaginationContextProps, 'children'> {
	currentPage: number;
	canPrev: boolean;
	canNext: boolean;

	onChange: Required<T.PaginationProps>['onChange'];
	onPrev: Required<T.PaginationProps>['onPrev'];
	onNext: Required<T.PaginationProps>['onNext'];

	theme: Theme;
}

export const PaginationContext = createContext({} as PaginationContextData);

export function PaginationProvider({
	props,
	children,
}: PaginationContextProps) {
	// States
	const [current, setCurrent] = useControlledState(props.current, 1);

	// Memo vars
	const canPrev = useMemo(() => {
		return Number(current) > 1;
	}, [current]);

	const canNext = useMemo(() => {
		return Number(current) < props.pages;
	}, [current, props.pages]);

	// Previous states
	const previousPages = usePrevious(props.pages);

	// Effects
	useEffect(() => {
		console.log({
			pageData: props.pageData,
			previousPages,
			current,
		});

		if (typeof props.pageData === 'undefined') return;
		if (previousPages === props.pages) return;
		if (props.pageData.length > 0) return;
		if (props.pageData.length === 0 && current === 1) return;

		setCurrent(1);
	}, [current, previousPages, props.pageData, props.pages, setCurrent]);

	// Functions
	function handleChangePage(page: number) {
		setCurrent(page);
		props.onChange?.(page);
	}

	function handlePrevPage() {
		const page = Number(current) - 1;

		if (!canPrev) return;

		setCurrent(page);
		props.onChange?.(page);
		props.onPrev?.();
	}

	function handleNextPage() {
		const page = Number(current) + 1;

		if (!canNext) return;

		setCurrent(page);
		props.onChange?.(page);
		props.onNext?.();
	}

	return (
		<PaginationContext.Provider
			value={{
				props,

				currentPage: current
					? current > props.pages
						? 1
						: current
					: 1,
				canPrev,
				canNext,

				onChange: handleChangePage,
				onPrev: handlePrevPage,
				onNext: handleNextPage,

				theme: props.theme,
			}}
		>
			{children}
		</PaginationContext.Provider>
	);
}

export const usePagination = () => useContext(PaginationContext);

export const withPaginationContext = (props: any) => {
	return <PaginationProvider {...props}>{props.children}</PaginationProvider>;
};
