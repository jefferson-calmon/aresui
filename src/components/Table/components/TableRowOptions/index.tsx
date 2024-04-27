import React, { useMemo } from 'react';

import * as Types from '../../Table.types';
import * as Utils from '../../Table.utils';
import * as Icons from '../../Table.icons';
import { useTable } from 'components/Table/Table.context';
import { Dropdown, DropdownMenuItem } from '../../../';

import { TableRowOptionsContainer } from './styles';

export interface TableRowOptionsProps<T> {
	data: T;
}

function TableRowOptions<T extends Types.TableBaseDataType>(
	props: TableRowOptionsProps<T>
) {
	// Hooks
	const table = useTable<T>();

	// Memo vars
	const className = useMemo(() => {
		const classes = [
			Utils.classBase('column'),
			Utils.classBase('column', 'options'),
		];

		return classes.compact().uniq().join(' ');
	}, []);

	const options = useMemo(() => {
		const options = table.props.options ?? [];

		return options.map<DropdownMenuItem>((option) => ({
			id: Number.random(8).toString(),
			content: Utils.processor(props.data, option.content),
			linkTo: Utils.processor(props.data, option.linkTo),
			onClick: () => Utils.processor(props.data, option.onClick),
		}));
	}, [props.data, table.props.options]);

	return (
		<TableRowOptionsContainer className={className}>
			<Dropdown items={options} placement="bottom-right">
				<span>
					<Icons.Dots />
				</span>
			</Dropdown>
		</TableRowOptionsContainer>
	);
}

export default TableRowOptions;
