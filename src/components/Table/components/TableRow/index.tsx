import React, { useMemo } from 'react';

import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';

import * as Types from '../../Table.types';
import * as Utils from '../../Table.utils';
import * as Components from '../../Table.components';
import { Checkbox } from '../../../';
import { useTable } from 'components/Table/Table.context';

import { TableRowContainer } from './styles';

export interface TableRowProps<T> {
	data: T;
	header?: boolean;
}

function TableRow<T extends Types.TableBaseData>(props: TableRowProps<T>) {
	// Hooks
	const table = useTable<T>();

	// Memo vars
	const columns = useMemo(() => {
		if (props.header) return Object.values(table.columns);

		return Object.keys(props.data)
			.filter((key) => key in table.columns)
			.orderByArray(Object.keys(table.columns))
			.map((key) => key as keyof T);
	}, [props.data, props.header, table.columns]);

	const className = useMemo(() => {
		const classes = [
			Utils.classBase('row'),
			props.header && Utils.classBase('row-header'),
		];

		return classes.compact().uniq().join(' ');
	}, [props.header]);

	const isSelected = useMemo(() => {
		const selected = table.selected;
		const data = table.data;

		if (props.header) return selected.length === data.length;

		return !!selected.find((s) => s.id === props.data.id);
	}, [props.data.id, props.header, table.data, table.selected]);

	// Functions
	function handleSelectRow() {
		if (props.header) return table.onSelectAll();

		return table.onSelect(props.data);
	}

	return (
		<TableRowContainer
			className={Utils.classBase('row-wrapper')}
			data-header={String(props.header)}
		>
			<motion.div className={className} key={props.data.id}>
				{table.selectable && (
					<Checkbox
						label=""
						checked={isSelected}
						onChange={handleSelectRow}
					/>
				)}

				{columns.map((column) => (
					<Components.TableColumn<T>
						key={String(column)}
						column={column}
						data={props.data}
						header={props.header}
					/>
				))}

				{table.options && !props.header && (
					<Components.TableRowOptions<T> data={props.data} />
				)}
			</motion.div>
		</TableRowContainer>
	);
}

function TableRowSkeleton() {
	// Hooks
	const table = useTable<object>();

	return (
		<TableRowContainer className={Utils.classBase('row-wrapper')}>
			{table.loadingType === 'flat' && (
				<Skeleton width="100%" height={table.style.rowMinHeight} />
			)}

			{table.loadingType === 'detailed' && (
				<motion.div className={Utils.classBase('row')}>
					{Object.keys(table.columns).map((key) => (
						<Components.TableColumn.Skeleton key={key} />
					))}

					{table.options && (
						<Skeleton
							className={Utils.classBase(
								'loading',
								'column-options'
							)}
							width={36}
							height={36}
						/>
					)}
				</motion.div>
			)}
		</TableRowContainer>
	);
}

TableRow.Skeleton = TableRowSkeleton;

export default TableRow;
