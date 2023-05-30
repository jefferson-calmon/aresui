import styled, { StyledComponent } from 'styled-components';

import * as H from 'helpers/styled';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { classBase } from './Input.utils';
import { InputProps } from './Input.types';

interface Props {
	theme: Theme;
	width: InputProps['width'];
}

export const InputContainer = styled.div`
	${(props: Props) => globalStyle(props.theme)};

	--height: 44px;

	position: relative;

	display: flex;
	align-items: flex-start;
	flex-direction: column;

	width: ${(props: Props) => props.width};

	label {
		display: inline-block;
		font-size: 14px;
		font-weight: 400;

		color: ${H.readableColorByBackground};

		margin-bottom: 8px;
	}

	.${classBase('input-container')} {
		position: relative;

		display: flex;

		width: 100%;

		background: ${(props: Props) => props.theme.colors.background};
		border-radius: var(--border-radius);
		outline: var(--border-width-unfocused) solid var(--color-line);

		.${classBase('input-addon')} {
			display: flex;
			align-items: center;
			justify-content: center;

			height: var(--height);
			padding: 0 14px;

			font-size: 16px;
			font-weight: 500;

			opacity: 0.9;

			background: #f9f9f9;
			color: ${H.readableColorByBackground};
		}

		input {
			position: relative;
			width: 100%;
			height: var(--height);
			padding: 0 16px;

			font-size: 16px;
			font-weight: 500;
			color: ${H.readableColorByBackground};

			background: transparent;
			border-radius: var(--border-radius);

			&:-webkit-autofill,
			&:-webkit-autofill:hover,
			&:-webkit-autofill:focus {
				background: transparent;
			}

			&::placeholder {
				font-weight: 400;
				color: var(--color-placeholder);
				font-size: 16px;
			}
		}

		.${classBase('picker-options')} {
			position: absolute;
			bottom: -8px;
			left: 0;
			transform: translateY(100%);

			display: flex;
			flex-direction: column;

			background: var(--color-background);
			border: var(--border-width-focused) solid var(--color-line);
			border-radius: var(--border-radius);

			width: 100%;
			max-height: 200px;

			padding: 8px 0;

			overflow-y: scroll;

			.${classBase('picker-option')} {
				display: flex;
				align-items: center;
				height: 40px;

				font-size: 16px;
				padding: 0 14px;

				opacity: 0.6;

                &.disabled {
                    opacity: .3;
                    cursor: not-allowed;
                }

				&:hover:not(.disabled):not(.not-found) {
					opacity: 1;
					background: ${H.transparentizePrimaryColorBy97Percent};
				}
			}
		}
	}

	.${classBase('errors')} {
		display: flex;
		flex-direction: column;
		gap: 4px;

		margin-top: 8px;

		.${classBase('error')} {
			display: flex;

			color: var(--color-error);
			font-size: 14px;
			font-weight: 400;
		}
	}

	&.${classBase('focused')} {
		.${classBase('input-container')} {
			outline: var(--border-width-focused) solid var(--color-primary);
		}
	}

	&.${classBase('disabled')} {
		cursor: not-allowed;
		user-select: none;
		pointer-events: visible;

		input {
			pointer-events: visible;
		}

		opacity: 0.4;
	}

	&.${classBase('invalid')} input {
		outline: var(--border-width-focused) solid var(--color-error);
	}

	&:hover {
		/* input {
			&:not(:focus):not(.aresui-input-invalid) {
				outline-color: ${H.darkenLineColorBy5Percent};
			}
		} */
	}
` as StyledComponent<'div', any, Props, never>;
