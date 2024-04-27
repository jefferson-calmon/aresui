import React, { useMemo } from 'react';

import { Dropdown, DropdownMenuItem } from '../../../';

import * as Types from '../../Table.types';
import * as Icons from '../../Table.icons';
import * as Utils from '../../Table.utils';
import TableHeadingSelecting from './components/TableHeadingSelecting';
import { useTable } from 'components/Table/Table.context';

import { TableHeadingContainer } from './styles';

function TableHeading<T extends Types.TableBaseDataType>() {
	// Hooks
	const table = useTable<T>();

	// Memo vars
	const sortOptions = useMemo(() => {
		return Object.entries(table.props.sort || {}).map<DropdownMenuItem>(
			([key, value]) => ({
				id: key,
				content: value,
				onClick: () => table.onSort(key as keyof T),
			})
		);
	}, [table]);

	if (table.isSelecting) return <TableHeadingSelecting />;

	return (
		<TableHeadingContainer className={Utils.classBase('heading')}>
			{!table.props.layout.includes('heading:search') && <div />}
			{table.props.layout.includes('heading:search') && (
				<div className="search">
					<div className="search-icon">
						<Icons.Search />
					</div>

					<input
						type="text"
						placeholder="Pesquise aqui"
						onChange={(e) => table.onSearch(e.target.value)}
					/>
				</div>
			)}

			<div className="handlers">
				{table.props.layout.includes('heading:sort') &&
					table.props.sortType === 'button' && (
						<Dropdown items={sortOptions} placement="bottom-right">
							<div className="handler">
								<Icons.Sort />

								<span>Ordenar</span>
							</div>
						</Dropdown>
					)}

				{table.props.layout.includes('heading:filter') && (
					<div className="handler">
						<Icons.Filter />

						<span>Filtrar</span>
					</div>
				)}

				{table.props.layout.includes('heading:options') && (
					<Dropdown items={[]} placement="bottom-right">
						<div className="handler options">
							<Icons.Dots />
						</div>
					</Dropdown>
				)}

				{table.props.customHeadingHandlers && (
					<table.props.customHeadingHandlers {...table.props} />
				)}
			</div>
		</TableHeadingContainer>
	);
}

export default TableHeading;
