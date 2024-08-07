import React from 'react';

import { config } from 'codekit';

import * as Types from './Table.types';
import * as Utils from './Table.utils';
import * as Components from './Table.components';
import * as Context from './Table.context';
import { Pagination } from '../';

import { TableContainer } from './Table.styles';

Utils.config();
config();

export function Table<T extends Types.TableBaseData>(
	props: Types.TableProps<T>
) {
	return (
		<Context.TableProvider {...props}>
			<TableContent<T> />
		</Context.TableProvider>
	);
}

function TableContent<T extends Types.TableBaseData>() {
	// Hooks
	const table = Context.useTable<T>();

	return (
		<TableContainer className={Utils.classBase()} $style={table.style}>
			{table.render.heading && <Components.TableHeading<T> />}

			<div className={Utils.classBase('heading-container')}>
				<Components.TableRow<T>
					data={table.data[0] ?? {}}
					index={-1}
					header
				/>
			</div>

			<div
				className={Utils.classBase('rows')}
				style={{
					gap: table.style.rowsGap,
				}}
			>
				{table.render.data &&
					table.pagination.page.items.map((data, index) => (
						<Components.TableRow<T>
							key={data.id}
							index={index}
							data={data}
						/>
					))}

				{table.render.skeleton &&
					Array.new(table.pagination.size).map((item) => (
						<Components.TableRow.Skeleton key={item.id} />
					))}

				{table.render.noDataMessage && <Components.NotFoundMessage />}
			</div>

			{table.render.pagination && (
				<Pagination
					pages={table.pagination.pages.length}
					pageData={table.pagination.page.items}
					current={table.pagination.page.number}
					onChange={table.pagination.changePage}
				/>
			)}
		</TableContainer>
	);
}

export * from './Table.types';

export default Table;
