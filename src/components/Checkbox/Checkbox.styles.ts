import { Theme } from 'contexts';

import * as H from 'helpers/styled';
import styled, { StyledComponent } from 'styled-components';
import { globalStyle } from 'styles/global/components';
import { classBase } from './Checkbox.utils';

interface Props {
	UITheme: Theme;
	size: number;
}

export const CheckboxContainer = styled.div`
	${(props: Props) => globalStyle(props.UITheme)}

	--width: ${(props) => props.size + 'px'};

	display: flex;
	align-items: center;

	cursor: pointer;

	width: fit-content;

	label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;

		.${classBase('wrapper')} {
			position: relative;

			display: flex;
			align-items: center;
			justify-content: center;

			width: var(--width);
			height: var(--width);

			border-radius: calc(var(--border-radius) - 1px);
			border: var(--border-width-focused) solid var(--color-line-dark);

			cursor: pointer;

			input[type='checkbox'] {
				width: 0;
				height: 0;
				opacity: 0;
				position: absolute;
			}

			svg {
				width: ${(props) => props.size - 6 + 'px'};
				height: ${(props) => props.size - 6 + 'px'};

				object-fit: contain;

				color: ${H.readableColorByPrimary};

				animation: fadeIn 0.2s ease-in-out forwards;
				opacity: 0;
				transform: scale(0.8);
			}

			.${classBase('checked')} {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		span.${classBase('label')} {
			font-size: 16px;
			cursor: pointer;
		}
	}

	&:hover:not(.aresui-checkbox-disabled),
	&.${classBase('checked')} {
		label {
			.${classBase('wrapper')} {
				border-color: var(--color-primary);
			}
		}
	}

	&.${classBase('checked')} {
		label {
			.${classBase('wrapper')} {
				background: var(--color-primary);

				&::before {
					position: absolute;
					top: 0;
					left: 0;

					width: 100%;
					height: 100%;
				}
			}
		}
	}

	&.${classBase('disabled')} {
		opacity: 0.4;
		cursor: not-allowed !important;

		* {
			cursor: not-allowed !important;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.8);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes bounceIn {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
		70% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
` as StyledComponent<'div', any, Props, never>;

export default CheckboxContainer;
