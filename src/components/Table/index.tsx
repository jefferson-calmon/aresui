import React from 'react';
import { useMemo, useState } from 'react';

import { usePagination } from 'codekit';

import * as Types from './Table.types';
import * as Utils from './Table.utils';
import * as Components from './Table.components';
import * as Context from './Table.context';
import { Pagination } from '../';

import { TableContainer } from './Table.styles';

Utils.config();

export function Table<T extends Types.TableBaseDataType>(
	props: Types.TableProps<T>
) {
	// States
	const [search, setSearch] = useState<string>('');
	const [sort, setSort] = useState<[keyof T, 'asc' | 'desc']>();
	const [selected, setSelected] = useState<T[]>([]);

	// Memo vars
	const style = useMemo(() => {
		return Utils.styleProcessor(props);
	}, [props]);

	const data = useMemo(() => {
		let data = Object.clone(props.data) as T[];

		const searchFor = props.searchFor ? props.searchFor : [];

		if (searchFor.length) data = data.search(searchFor, search);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		if (sort?.[0]) data = data.order<any, T>(sort[0], sort[1]);

		return data;
	}, [props.data, props.searchFor, search, sort]);

	const pageSize = useMemo(() => {
		return props.pagination?.size ? props.pagination?.size : 8;
	}, [props.pagination?.size]);

	const render = useMemo(() => {
		const renderNoDataMessage =
			!props.loading &&
			data.length === 0 &&
			props.layout.includes('no-data');

		const renderSkeleton = props.loading;
		const renderData = !props.loading;
		const renderHeading = props.layout.some((m) => m.startsWith('heading'));
		const renderPagination = props.layout.includes('pagination');

		return {
			noDataMessage: renderNoDataMessage,
			skeleton: renderSkeleton,
			data: renderData,
			heading: renderHeading,
			pagination: renderPagination,
		};
	}, [data.length, props.loading, props.layout]);

	const isSelecting = useMemo(() => selected.length !== 0, [selected]);

	// Pagination
	const pagination = usePagination<T>(data, pageSize);

	// Functions
	function handleSort(key: keyof T) {
		setSort((prev) => [
			key,
			prev?.[1] === 'asc' && prev?.[0] === key ? 'desc' : 'asc',
		]);
	}

	function handleSelect(data: T) {
		return setSelected((prev) => {
			const alreadySelected = prev.find((p) => p.id === data.id);

			if (!alreadySelected) return [...prev, data];

			return prev.filter((p) => p.id !== data.id);
		});
	}

	function handleSelectAll() {
		setSelected((prev) => {
			const alreadySelected = prev.length === data.length;

			return alreadySelected ? [] : [...data];
		});
	}

	return (
		<Context.TableProvider
			props={props}
			style={style}
			search={search}
			selected={selected}
			isSelecting={isSelecting}
			sort={{ item: sort?.[0], direction: sort?.[1] }}
			onSearch={(value: string) => setSearch(value)}
			onSort={handleSort}
			onSelect={handleSelect}
			onSelectAll={handleSelectAll}
			onEndSelecting={() => setSelected([])}
		>
			<TableContainer className={Utils.classBase()} $style={style}>
				{render.heading && <Components.TableHeading<T> />}

				<div className={Utils.classBase('heading-container')}>
					<Components.TableRow<T> data={props.data[0] ?? {}} header />
				</div>

				<div
					className={Utils.classBase('rows')}
					style={{
						gap: style.rowsGap,
					}}
				>
					{render.data &&
						pagination.page.items.map((data) => (
							<Components.TableRow<T> key={data.id} data={data} />
						))}

					{render.skeleton &&
						Array.new(pageSize).map((item) => (
							<Components.TableRow.Skeleton key={item.id} />
						))}

					{render.noDataMessage && <Components.NotFoundMessage />}
				</div>

				{render.pagination && (
					<Pagination
						pages={pagination.pages.length}
						current={pagination.page.number}
						onChange={pagination.changePage}
					/>
				)}
			</TableContainer>
		</Context.TableProvider>
	);
}

export * from './Table.types';

Table.defaultProps = Types.defaultPropsTable;

export default Table;
