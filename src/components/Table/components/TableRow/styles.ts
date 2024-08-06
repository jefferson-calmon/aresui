import styled from 'styled-components';
import { motion } from 'framer-motion';

import * as Utils from '../../Table.utils';

export const TableRowContainer = styled(motion.div)`
	display: flex;
	align-items: center;
	/* flex-direction: column; */
	gap: 20px;

	flex: 1;

	> span[aria-busy='true'] {
		width: 100%;
	}

	&[data-header='true'] {
		margin-bottom: 16px;
	}

	.${Utils.classBase('row')} {
		display: grid;
		align-items: center;

		width: 100%;

		grid-template-columns: var(--aresui-table-columns);
		gap: var(--aresui-table-columns-gap);
		min-height: var(--aresui-table-row-height);
		border-color: var(--aresui-table-row-border-color);
		padding-left: var(--aresui-table-row-horizontal-padding);
		padding-right: var(--aresui-table-row-horizontal-padding);
		padding-top: var(--aresui-table-row-vertical-padding);
		padding-bottom: var(--aresui-table-row-vertical-padding);
		background: var(--aresui-table-row-background);
		border-radius: var(--aresui-table-border-radius);

		&:not(.${Utils.classBase('row-header')}) {
			border-width: 1px;
			border-style: solid;

			transition: 0.1s;

			&:hover {
				border-color: var(
					--aresui-table-hover-row-border-color
				) !important;
				background: var(--aresui-table-hover-row-background);
			}
		}

		.aresui-checkbox {
			position: relative;
			z-index: 100;
		}

		&.${Utils.classBase('row-header')} {
			align-items: flex-start;
			background: transparent !important;

			min-height: unset !important;
			padding-top: 0 !important;
			padding-bottom: 0 !important;
		}
	}
`;
