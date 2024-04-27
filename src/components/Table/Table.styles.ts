import styled, { css } from 'styled-components';

import * as Utils from './Table.utils';
import { StyleConfig } from './Table.types';

interface Props {
	$style: StyleConfig;
}

export const TableContainer = styled.div`
	${({ $style: style }: Props) => css`
		--aresui-table-columns: ${style.columns};
		--aresui-table-border-radius: ${style.borderRadius};

		--aresui-table-rows-gap: ${style.rowsGap};
		--aresui-table-row-min-height: ${style.rowMinHeight};
		--aresui-table-row-horizontal-padding: ${style.rowHorizontalPadding};
		--aresui-table-row-vertical-padding: ${style.rowVerticalPadding};
		--aresui-table-row-border-color: ${style.rowBorderColor};
		--aresui-table-row-background: ${style.rowBackground};

		--aresui-table-columns-gap: ${style.columnsGap};
		--aresui-table-column-text-color: ${style.columnTextColor};
		--aresui-table-column-text-size: ${style.columnTextSize};
		--aresui-table-column-text-weight: ${style.columnTextWeight};

		--aresui-table-handler-height: ${style.handlerHeight};
		--aresui-table-handler-background: ${style.handlerBackground};
		--aresui-table-handler-border-color: ${style.handlerBorderColor};

		--aresui-table-hover-row-border-color: ${style.hoverRowBorderColor ??
		'#000'};
		--aresui-table-hover-row-background: ${style.hoverRowBackground};
	`}

	display: flex;
	flex-direction: column;

	width: 100%;

	.${Utils.classBase('heading-container')} {
		display: flex;
		align-items: flex-start;
		gap: 20px;

		max-height: 500px;

		.checkbox {
			margin-top: 3px;
		}
	}

	.${Utils.classBase('rows')} {
		display: flex;
		flex-direction: column;
		gap: 6.4px;
	}

	.aresui-pagination {
		margin-top: 24px;
		padding: 0 8px;
	}
`;

export const PaginationContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	margin-top: 32px;
	padding: 0 2px;

	.pagination-info {
		font-size: 14px;
	}

	.pagination-buttons {
		display: flex;
		align-items: center;
		gap: 12px;

		button {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 20px;
			height: 20px;

			font-size: 12px;

			background: transparent;

			&.not-allowed {
				cursor: not-allowed;
				opacity: 0.5;
			}
		}

		strong {
			font-size: 13px;
		}
	}
`;

export default TableContainer;
