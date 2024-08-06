/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from 'react';

import { usePagination } from 'codekit';

import * as Types from './Table.types';
import { styleProcessor } from './Table.utils';

interface TableContextProps<T> extends Types.TableProps<T> {
	children: React.ReactNode;
}

export interface TableContextData<T>
	extends Omit<Types.TableProps<T>, 'sort' | 'search' | 'style'> {
	props: Types.TablePropsCompiled<T>;

	data: T[];
	render: {
		noDataMessage: boolean;
		skeleton: boolean;
		data: boolean;
		heading: boolean;
		pagination: boolean;
	};
	layout: Required<Types.TableProps<T>>['layout'];

	loadingType: Required<Types.TableProps<T>>['loadingType'];
	sortType: Required<Types.TableProps<T>>['sortType'];

	style: Types.StyleConfig;
	pagination: Required<Types.TableProps<T>>['pagination'] &
		ReturnType<typeof usePagination<T>>;

	search: string;
	selected: Selected<T>[];
	lastSelected: Selected<T>;
	selectable: Required<Types.TableProps<T>>['selectable'];
	isSelecting: boolean;
	sort: { item: keyof T | undefined; direction: 'asc' | 'desc' | undefined };

	onSearch: (value: string) => void;
	onSort: (key: keyof T) => void;
	onSelect: (data: Selected<T>) => void;
	onSelectAll: () => void;
	onEndSelecting: () => void;
}

type Selected<T> = T & { index: number };

export const TableContext = createContext<any>({} as TableContextData<any>);

export function TableProvider<T extends Types.TableBaseData>({
	layout = ['no-data', 'pagination', 'heading:search', 'heading:sort'],
	loading = false,
	selectable = true,
	search: propSearch = [],
	pagination: propPagination = { size: 8 },
	loadingType = 'detailed',
	sortType = 'row',
	style: propStyle = {},
	children,
	...props
}: TableContextProps<T>) {
	// States
	const [search, setSearch] = useState<string>('');
	const [sort, setSort] = useState<[keyof T, 'asc' | 'desc']>();
	const [selected, setSelected] = useState<Selected<T>[]>([]);
	const [lastSelected, setLastSelected] = useState<Selected<T> | null>(null);

	// Memo vars
	const style = useMemo(() => {
		return styleProcessor({
			data: props.data,
			columns: props.columns,
			options: props.options,
			style: propStyle,
			loading,
			selectable,
		});
	}, [loading, propStyle, props, selectable]);

	const compiledProps = useMemo(() => {
		return {
			...props,
			layout,
			loading,
			selectable,
			search: propSearch,
			pagination: propPagination,
			loadingType,
			sortType,
			style: propStyle,
		} as Types.TablePropsCompiled<T>;
	}, [
		layout,
		loading,
		loadingType,
		propPagination,
		propSearch,
		propStyle,
		props,
		selectable,
		sortType,
	]);

	const data = useMemo(() => {
		let data = Object.clone(props.data) as T[];

		if (propSearch.length > 0) data = data.search(propSearch, search);
		if (sort?.[0]) data = data.order<any, T>(sort[0], sort[1]);

		return data;
	}, [props.data, propSearch, search, sort]);

	const render = useMemo(() => {
		const renderNoDataMessage =
			!loading && data.length === 0 && layout.includes('no-data');

		const renderSkeleton = loading;
		const renderData = !loading;
		const renderHeading = layout.some((m) => m.startsWith('heading'));
		const renderPagination = layout.includes('pagination');

		return {
			noDataMessage: renderNoDataMessage,
			skeleton: renderSkeleton,
			data: renderData,
			heading: renderHeading,
			pagination: renderPagination,
		};
	}, [data.length, loading, layout]);

	const isSelecting = useMemo(() => selected.length !== 0, [selected]);

	// Pagination
	const pagination = usePagination<T>(data, propPagination.size);

	// Functions
	function handleSort(key: keyof T) {
		setSort((prev) => [
			key,
			prev?.[1] === 'asc' && prev?.[0] === key ? 'desc' : 'asc',
		]);
	}

	function handleSearch(value: string) {
		setSearch(value);
	}

	function handleSelect(data: Selected<T>) {
		setLastSelected(data);

		return setSelected((prev) => {
			const alreadySelected = prev.find((p) => p.id === data.id);

			if (!alreadySelected) return [...prev, data];

			setLastSelected(null);
			return prev.filter((p) => p.id !== data.id);
		});
	}

	function handleSelectAll() {
		setSelected((prev) => {
			const alreadySelected = prev.length === data.length;
			const newData = data.map((data, index) => ({ ...data, index }));

			return alreadySelected ? [] : [...newData];
		});
	}

	function handleEndSelecting() {
		setSelected([]);
        setLastSelected(null);
	}

	return (
		<TableContext.Provider
			value={
				{
					// --- Default Props
					...props,
					props: compiledProps,
					layout,
					loading,
					selectable,
					loadingType,
					sortType,
					style,

					// --- Extra Props
					data,
					render,
					selected,
					lastSelected,
					search,

					isSelecting,

					pagination: { ...pagination, ...propPagination },
					sort: { item: sort?.[0], direction: sort?.[1] },

					onSearch: handleSearch,
					onSort: handleSort,
					onSelect: handleSelect,
					onSelectAll: handleSelectAll,
					onEndSelecting: handleEndSelecting,
				} as TableContextData<T>
			}
		>
			{children}
		</TableContext.Provider>
	);
}

export function useTable<T>() {
	return useContext(TableContext) as TableContextData<T>;
}
