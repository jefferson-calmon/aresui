/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { StyledComponent } from 'styled-components';

import * as H from 'helpers/styled';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { Width } from 'types';
import { classBase } from './Select.utils';

export interface Props {
	$theme: Theme;
	$width: Width;
}

type Styled = StyledComponent<'div', any, Props, never>;

export const SelectContainer: Styled = styled.div`
	${(props: Props) => globalStyle(props.$theme)}

	--width: ${(props: Props) => props.$width};
	--height: var(--base-height);

	position: relative;

	display: flex;
	align-items: flex-start;
	flex-direction: column;

	width: var(--width);

	label {
		display: inline-block;
		font-size: 14px;
		font-weight: 400;

		color: ${H.readableColor('background')};

		margin-bottom: 6px;
	}

	select {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		user-select: none;
	}

	> .aresui-dropdown {
		width: var(--width);
	}

	.${classBase('select')} {
		position: relative;
		width: var(--width);
		height: var(--height);
		padding: 0 16px;

		background: var(--color-background);
		border-radius: var(--border-radius);
		outline: var(--border-width-unfocused) solid var(--color-line);

		transition: 0.3s;

		.${classBase('current')} {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 12px;

			height: 100%;
			width: 100%;
			color: ${H.readableColor('background')};
			font-size: 16px;

			span {
				font-weight: 500;
			}

            div {
                display: flex;
                align-items: center;
            }

			svg {
				--icon-size: 14px;

				width: var(--icon-size);
				height: var(--icon-size);
				stroke-width: 1.5;
				object-fit: contain;
				transition: 0.15s ease-in-out;
				opacity: 0.8;

				&.lucide-x {
					--icon-size: 16px;
				}
			}
		}
	}

	&.${classBase('active')} {
		.${classBase('select')} {
			.${classBase('current')} {
				svg:not(.lucide-x) {
					transform: rotate(-180deg);
				}
			}
		}
	}

	&.${classBase('disabled')} {
		cursor: not-allowed;
		user-select: none;
		pointer-events: visible;

		opacity: 0.4;

		.aresui-dropdown {
			pointer-events: none;
		}
	}
`;

export default SelectContainer;
