import styled from 'styled-components';

import * as Utils from '../../Table.utils';

export const TableColumnContainer = styled.div`
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;
	justify-content: flex-start;
	text-align: center;

	width: 100%;

	color: var(--aresui-table-column-text-color);
	font-size: var(--aresui-table-column-text-size);
	font-weight: var(--aresui-table-column-text-weight);

	> span,
	> strong,
	> p {
		width: 100%;

		white-space: nowrap;
		display: inline-flex;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
		overflow-wrap: anywhere;

		text-align: left;
		font-size: calc(var(--text-size) - 2px);

		span {
		}
	}

	> strong[data-sortable='false'] {
		svg {
			display: none;
		}
	}

	> strong[data-sortable='true'] {
		position: relative;

		display: flex;
		align-items: center;
		gap: 8px;

		width: fit-content;
		cursor: pointer;

		svg {
			opacity: 0;
			font-size: 16px;
		}

		&:hover,
		&[data-sorting='true'] {
			svg {
				opacity: 1;
			}
		}
	}

	span[aria-live='polite'] {
		width: 100%;
	}

	&.${Utils.classBase('column-header')} {
		strong {
			font: 500 16px 'Montserrat', 'Open Sans', sans-serif !important;
			color: #000 !important;
			line-height: 1.7;
		}
	}
`;
