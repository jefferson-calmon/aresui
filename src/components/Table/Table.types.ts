/* eslint-disable @typescript-eslint/no-explicit-any */
import { KeyOf } from 'codekit';

export type TableLayout =
	| 'no-data'
	| 'pagination'
	| 'heading:search'
	| 'heading:sort'
	| 'heading:filter'
	| 'heading:options';

export type TableLoading = 'detailed' | 'flat';
export type TableSort = 'row' | 'button';

export interface TableBaseData {
	id: string;
}

export interface TableProps<T> {
	data: T[];
	columns: Partial<Record<keyof T, string>>;
	layout?: TableLayout[];

	loading?: boolean;
	selectable?: boolean;

	style?: Partial<StyleConfig>;

	pagination?: {
		size: number;
	};

	customColumns?: Partial<Record<keyof T, (data: T) => any>>;
	customColumnsHeader?: Partial<Record<keyof T, (data: T) => any>>;
	options?: TableOption<T>[];
	sort?: Partial<Record<keyof T, string>>;
	search?: KeyOf<T>[];

	loadingType?: TableLoading;
	sortType?: TableSort;

	customHeadingHandlers?: (props: TablePropsCompiled<T>) => JSX.Element;

	onCompleteSelection?: (selected: T[]) => void;

	labels?: {
		selectionConfirm?: string;
	};
}

export interface TablePropsCompiled<T> extends TableProps<T> {
	layout: Required<TableProps<T>>['layout'];
	search: Required<TableProps<T>>['search'];
	loading: Required<TableProps<T>>['loading'];
	selectable: Required<TableProps<T>>['selectable'];
	pagination: Required<TableProps<T>>['pagination'];
	loadingType: Required<TableProps<T>>['loadingType'];
	sortType: Required<TableProps<T>>['sortType'];
}

export interface TableOption<T> {
	content: ((data: T) => string | JSX.Element) | string | JSX.Element;
	linkTo?: ((data: T) => string) | string;
	onClick?: (data: T) => void;
}

export interface StyleConfig {
	columns: string;
	borderRadius: string;

	rowsGap: string;
	rowMinHeight: string;
	rowHorizontalPadding: string;
	rowVerticalPadding: string;
	rowBorderColor: string;
	rowBackground: string;

	columnsGap: string;
	columnTextColor: string;
	columnTextSize: string;
	columnTextWeight: string;

	handlerHeight: string;
	handlerBackground: string;
	handlerBorderColor: string;

	hoverRowBorderColor?: string;
	hoverRowBackground?: string;
}
