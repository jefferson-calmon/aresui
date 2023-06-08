import styled, { StyledComponent } from 'styled-components';

import * as H from 'helpers/styled';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { classBase } from './TextArea.utils';
import { TextAreaProps } from './TextArea.types';

interface Props {
	UITheme: Theme;
    width: TextAreaProps['width'];
}

export const TextAreaContainer = styled.div`
	${(props: Props) => globalStyle(props.UITheme)};

	--height: calc(var(--base-height) * 2);

	position: relative;

	display: flex;
	align-items: flex-start;
	flex-direction: column;

	label {
		display: inline-block;
		font-size: 14px;
		font-weight: 400;

		color: ${H.readableColorByBackground};

		margin-bottom: 6px;
	}

	.${classBase('TextArea-container')} {
		position: relative;

		display: flex;

		background: ${(props: Props) => props.UITheme.colors.background};
		border-radius: var(--border-radius);
		outline: var(--border-width-unfocused) solid var(--color-line);

		TextArea {
			position: relative;
            width: ${(props: Props) => props.width};
			height: var(--height);
			padding: 16px;

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
		.${classBase('TextArea-container')} {
			outline: var(--border-width-focused) solid var(--color-primary);
		}
	}

	&.${classBase('disabled')} {
		cursor: not-allowed;
		user-select: none;
		pointer-events: visible;

		TextArea {
			pointer-events: visible;
		}

		opacity: 0.4;
	}

	&.${classBase('invalid')} {
		.${classBase('TextArea-container')} {
			outline: var(--border-width-focused) solid var(--color-error);
		}
	}

	&:hover {
		/* TextArea {
			&:not(:focus):not(.aresui-TextArea-invalid) {
				outline-color: ${H.darkenLineColorBy5Percent};
			}
		} */
	}
` as StyledComponent<'div', any, Props, never>;
