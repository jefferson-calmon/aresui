import React, { useMemo } from 'react';

import Skeleton from 'react-loading-skeleton';

import * as Types from '../../Table.types';
import * as Utils from '../../Table.utils';
import * as Components from '../../Table.components';
import * as Icons from '../../Table.icons';
import { useTable } from 'components/Table/Table.context';

import { TableColumnContainer } from './styles';

export interface TableColumnProps<T> {
	data: T;
	column: keyof T | string;
	header?: boolean;
}

function TableColumn<T extends Types.TableBaseDataType>(
	props: TableColumnProps<T>
) {
	// Hooks
	const table = useTable<T>();

	// Memo vars
	const key = useMemo(() => {
		const columns = Object.entries(table.props.columns);
		const headerKey = columns.find(([, value]) => value === props.column);

		const key = !props.header ? props.column : headerKey?.[0];

		return (key ?? '') as keyof T;
	}, [props.column, props.header, table.props.columns]);

	const className = useMemo(() => {
		const classes = [
			Utils.classBase('column'),
			Utils.classBase(`column-${String(key)}`),
			props.header && Utils.classBase('column-header'),
		];

		return classes.compact().uniq().join(' ');
	}, [key, props.header]);

	const value = useMemo(() => {
		if (props.header) return String(props.column);

		return String(props.data[props.column as keyof T]);
	}, [props.column, props.data, props.header]);

	const CustomColumn = useMemo(() => {
		const customs = props.header
			? table.props.customColumnsHeader
			: table.props.customColumns;

		const customColumn = customs?.[key];

		return customColumn ? () => customColumn(props.data) : null;
	}, [key, props.data, props.header, table.props]);

	// console.log(key, CustomColumn);

	// Functions
	function handleClick() {
		if (table.props.sortType === 'row') table.onSort(key);
	}

	return (
		<TableColumnContainer
			className={className}
			title={!CustomColumn ? value : String(CustomColumn())}
		>
			{!CustomColumn && props.header && (
				<strong
					onClick={handleClick}
					data-sortable={table.props.sortType === 'row'}
					data-sorting={table.sort.item === key}
				>
					{value}

					{value &&
						(table.sort.item !== key || !table.sort?.direction) && (
							<Icons.SortUndefined />
						)}

					{value &&
						table.sort.item === key &&
						table.sort?.direction === 'desc' && <Icons.SortDesc />}
					{value &&
						table.sort.item === key &&
						table.sort?.direction === 'asc' && <Icons.SortAsc />}
				</strong>
			)}

			{!CustomColumn && !props.header && (
				<span>
					<Components.Highlight>{value}</Components.Highlight>
				</span>
			)}

			{CustomColumn &&
				(typeof CustomColumn() === 'string' ? (
					<Components.Highlight>
						{String(CustomColumn())}
					</Components.Highlight>
				) : (
					<CustomColumn />
				))}
		</TableColumnContainer>
	);
}

function TableColumnSkeleton() {
	return (
		<TableColumnContainer className={Utils.classBase('column')}>
			<Skeleton width={'100%'} height={18} />
		</TableColumnContainer>
	);
}

TableColumn.Skeleton = TableColumnSkeleton;

export default TableColumn;
