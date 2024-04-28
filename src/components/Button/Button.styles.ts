import styled, { css } from 'styled-components';

import * as H from 'helpers/styled';
import { globalStyle } from 'styles/global/components';
import { Theme } from 'contexts';
import { classBase } from './Button.utils';

interface Props {
	$theme: Theme;
	$loading?: string;
}

export const ButtonContainer = styled.button`
	${(props: Props) => globalStyle(props.$theme)}

	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	height: var(--base-height);

	font-size: 15px;
	font-weight: 500;

	border-radius: var(--border-radius);

	overflow: hidden;

	span {
		position: relative;
		z-index: 15;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;

		pointer-events: none;

		&[data-hidden='true'] {
			opacity: 0;
		}
	}

	.${classBase('link')} {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;

		width: 100%;
		height: 100%;

		opacity: 0;

		a {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	.${classBase('ripple')} {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		pointer-events: none;
		z-index: 3;

		animation: ripple-animation 0.6s;
	}

	.${classBase('loading-indicator')} {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 6;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;
	}

	/* Variants */
	&.${classBase('variant', 'default')} {
		background: var(--color-primary);
		color: ${H.readableColor('primary')};
		transition: 0.05s;

		.${classBase('ripple')} {
			background: ${H.transparentizeReadableColor('primary', 0.8)};
		}

		${(props) => getDefaultVariantHover(props)}
	}

	&.${classBase('variant', 'text')} {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		.${classBase('ripple')} {
			background: ${H.transparentize('primary', 0.9)};
		}

		${(props) => getTextVariantHover(props)}
	}

	&.${classBase('variant', 'secondary')} {
		background: ${H.transparentize('primary', 0.975)};
		color: ${H.readableColor('background')};
		transition: 0.1s;

		.${classBase('ripple')} {
			background: ${H.transparentize('primary', 0.92)};
		}

		${(props) => getSecondaryVariantHover(props)}
	}

	&.${classBase('variant', 'outlined')} {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		border: var(--border-width-unfocused) solid var(--color-primary);

		.${classBase('ripple')} {
			background: ${H.transparentizeReadableColor('primary', 0.8)};
		}

		${(props) => getOutlinedVariantHover(props)}
	}

	/* Sizes */
	&.${classBase('size', 'large')} {
		padding: 0 28px;
	}
	&.${classBase('size', 'normal')} {
		padding: 0 20px;
	}
	&.${classBase('size', 'small')} {
		padding: 0 16px;
	}
	&.${classBase('size', 'x-small')} {
		padding: 0 12px;
	}

	/* Button states */
	&:disabled {
		cursor: not-allowed;
		pointer-events: visible;
		user-select: none;
		opacity: 0.4;
	}

	@keyframes ripple-animation {
		to {
			transform: scale(2);
			opacity: 0;
		}
	}
`;

function getDefaultVariantHover(props: Props) {
	if (props.$loading) return css``;

	return css`
		&:hover {
			transform: scale(1.02);
		}
	`;
}

function getTextVariantHover(props: Props) {
	if (props.$loading) return css``;

	return css`
		&:hover {
			background: ${H.transparentize('primary', 0.97)};
		}
	`;
}

function getSecondaryVariantHover(props: Props) {
	if (props.$loading) return css``;

	return css`
		&:hover {
			background: ${H.transparentize('primary', 0.96)};
		}
	`;
}

function getOutlinedVariantHover(props: Props) {
	if (props.$loading) return css``;

	return css`
		&:hover {
			border-color: transparent;
			background: var(--color-primary);
			color: #fff;
		}
	`;
}
