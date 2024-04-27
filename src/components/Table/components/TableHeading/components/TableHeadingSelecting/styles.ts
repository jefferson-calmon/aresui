import styled from 'styled-components';
import { TableHeadingContainer } from '../../styles';

export const TableHeadingSelectingContainer = styled(TableHeadingContainer)`
	strong {
		font-size: 20px;
		font-weight: 600;
		color: #000;
	}

	.handlers {
		button {
			padding: 0 24px;
			min-height: var(--aresui-table-handler-height);
			border-radius: 6px;

			&:first-child {
				background: rgba(0, 0, 0, 0.02);
				color: #000;
				font-weight: 500;

				&:hover {
					background: rgba(0, 0, 0, 0.04);
				}
			}

			&:last-child {
				background: #000;
				color: #fff;

				&:hover {
					transform: scale(1.02);
				}
			}
		}
	}
`;
