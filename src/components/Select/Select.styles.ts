/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { StyledComponent } from 'styled-components';

import * as H from 'helpers/styled';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { Width } from 'types';
import { classBase } from './Select.utils';

export interface Props {
	UITheme: Theme;
	width: Width;
}

type Styled = StyledComponent<'div', any, Props, never>;

export const SelectContainer: Styled = styled.div`
	${(props: Props) => globalStyle(props.UITheme)}

	--width: ${(props: Props) => props.width};
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

		color: ${H.readableColorByBackground};

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

		background: transparent;
		border-radius: var(--border-radius);
		outline: var(--border-width-unfocused) solid var(--color-line);

		transition: 0.3s;

		.${classBase('current')} {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 1.2rem;

			height: 100%;
		    width: 100%;

			span {
				font-size: 16px;
				font-weight: 500;
				color: ${H.readableColorByBackground};
			}

			svg {
				font-size: 14px;
				width: 14px;
				height: 14px;
				object-fit: contain;
				transition: 0.15s ease-in-out;
			}
		}
	}

	&.${classBase('active')} {
		.${classBase('select')} {
			.${classBase('current')} {
				svg {
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
