import React from 'react';

import * as Types from '../../../../Table.types';
import { useTable } from 'components/Table/Table.context';

import { TableHeadingSelectingContainer } from './styles';

function TableHeadingSelecting<T extends Types.TableBaseDataType>() {
	// Hooks
	const table = useTable<T>();

	// Functions
	function handleConfirm() {
		table.onEndSelecting();
		table.props.onCompleteSelection?.(table.selected);
	}

	return (
		<TableHeadingSelectingContainer>
			<strong>Selecionado: {table.selected.length} itens</strong>

			<div className="handlers">
				<button onClick={table.onEndSelecting}>Cancelar seleção</button>
                
				<button onClick={handleConfirm}>Confirmar</button>
			</div>
		</TableHeadingSelectingContainer>
	);
}

export default TableHeadingSelecting;
