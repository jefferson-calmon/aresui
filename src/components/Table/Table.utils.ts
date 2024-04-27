/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleConfig, TableProps } from './Table.types';
import { baseClass } from 'helpers/baseClass';

export const classBase = baseClass('Table');

export function styleProcessor<T>(props: TableProps<T>) {
	const columnWidths: Record<string, string> = {};

	Object.keys(props.columns).forEach((column) => {
		const columnKey = column as keyof T;
		const columnData = props.data.map((item) => String(item[columnKey]));

		const maxWidth = Math.max(...columnData.map((c) => c.length));

		const columnSize = Number.isFinite(maxWidth) ? maxWidth / 10 + 1 : 1;

		columnWidths[column] = `${columnSize}fr`;
	});

	const dynamicColumns = !props.loading
		? Object.values(columnWidths).join(' ')
		: Object.keys(props.columns).fill('1fr').join(' ');

	const defaultStyleConfig: StyleConfig = {
		columns: `${dynamicColumns}`,
		borderRadius: '8px',

		rowsGap: '6.4px',
		rowMinHeight: '80px',
		rowBorderColor: '#e9ecef',
		rowHorizontalPadding: '24px',
		rowVerticalPadding: '12px',
		rowBackground: '#fff',

		columnsGap: '20px',
		columnTextColor: 'rgba(0, 0, 0, 0.8)',
		columnTextSize: '14px',
		columnTextWeight: '400',

		handlerHeight: '40px',
		handlerBackground: '#fff',
		handlerBorderColor: '#e9ecef',

		hoverRowBorderColor: '#000',
		hoverRowBackground: 'transparent',
	};

	const styles = Object.merge(
		defaultStyleConfig,
		props.style ?? {}
	) as StyleConfig;

	const columns = styles.columns
		.split(' ')
		.map((value, index) =>
			value === 'auto' ? dynamicColumns.split(' ')[index] : value
		)
		.join(' ');

	styles.columns = `
        ${props.selectable ? 'auto' : ''}
        ${columns}
        ${props.options ? '36px' : ''}`;

	return styles;
}

export function processor<T, H>(data: T, handler?: H) {
	if (!handler) return '';

	return handler instanceof Function ? handler(data) : handler;
}

declare global {
	interface Array<T> {
		orderByArray: (array: string[]) => T[];
	}
}

export function config() {
	Array.prototype.orderByArray = function (array) {
		const sort = (a: any, b: any) => array.indexOf(a) - array.indexOf(b);

		return this.sort(sort);
	};
}
