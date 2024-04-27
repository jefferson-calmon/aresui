/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext } from 'react';

import * as Types from './Table.types';

interface TableContextProps<T> {
	children: React.ReactNode;

	props: Types.TableProps<T>;
	style: Types.StyleConfig;

	search: string;
	selected: T[];
	isSelecting: boolean;
	sort: { item: keyof T | undefined; direction: 'asc' | 'desc' | undefined };

	onSearch: (value: string) => void;
	onSort: (key: keyof T) => void;
	onSelect: (data: T) => void;
	onSelectAll: () => void;
	onEndSelecting: () => void;
}

export interface TableContextData<T>
	extends Omit<TableContextProps<T>, 'children'> {
	debug?: boolean;
}

export const TableContext = createContext<any>({} as TableContextData<any>);

export function TableProvider<T>(props: TableContextProps<T>) {
	return (
		<TableContext.Provider
			value={{
				...props,
			}}
		>
			{props.children}
		</TableContext.Provider>
	);
}

export function useTable<T>() {
	return useContext(TableContext) as TableContextData<T>;
}
