import styled from 'styled-components';

import * as H from 'helpers/styled/index';
import { classBase } from 'components/Pagination/Pagination.utils';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';

interface Props {
	$theme: Theme;
}

export const PagerContainer = styled.div`
	${(props: Props) => globalStyle(props.$theme)}

	display: flex;
	align-items: center;
	gap: 4px;

	.${classBase('button')} {
		display: flex;
		align-items: center;
		justify-content: center;

		border-radius: 4px;
		padding: 0 8px;

		min-width: 26px;
		min-height: 26px;

		background: transparent;

		svg {
			width: 11px;
			height: 11px;
			object-fit: contain;
			color: ${H.transparentizeReadableColor('background', 0.1)};
		}

		span {
			font-size: 13px;
			color: ${H.transparentizeReadableColor('background', 0.07)};
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.4;
		}

		&:hover:not(:disabled) {
			background: ${H.transparentizeReadableColor('background', 0.95)};
		}

		&.${classBase('button', 'active')} {
			border: 1px solid ${H.transparentize('primary', 0.5)};
			background: transparent !important;

			&:hover {
				outline: 1px solid ${H.transparentize('primary', 0.2)};
			}
		}

		&.${classBase('button', 'page')} {
			min-width: 26px;
		}

		&.${classBase('button', 'ellipsis')} {
			opacity: 0.5 !important;
			background: transparent !important;
			padding: 0 6px;
		}
	}
`;
