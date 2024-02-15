/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo } from 'react';

import { mergeObjects } from 'codekit';

import * as T from './Pagination.types';
import { useControlledState } from 'hooks/useControlledState';
import { Theme, useAresUI } from 'contexts';

interface PaginationContextProps {
	children: React.ReactNode;

	props: T.PaginationProps;
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
	// Hooks
	const aresui = useAresUI();

	// States
	const [current, setCurrent] = useControlledState(props.current, 1);

	// Memo vars
	const canPrev = useMemo(() => {
		return Number(current) > 1;
	}, [current]);

	const canNext = useMemo(() => {
		return Number(current) < props.pages;
	}, [current, props.pages]);

	const theme = useMemo(() => {
		return mergeObjects(aresui.theme, props.theme ?? {});
	}, [aresui.theme, props.theme]);

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

				currentPage: current ?? 1,
				canPrev,
				canNext,

				onChange: handleChangePage,
				onPrev: handlePrevPage,
				onNext: handleNextPage,

				theme,
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
