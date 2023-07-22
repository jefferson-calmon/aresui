import styled, { css } from 'styled-components';
import { readableColor, transparentize } from 'polished';

import * as H from 'helpers/styled';
import { globalStyle } from 'styles/global/components';
import { Theme } from 'contexts';
import { classBase } from './Button.utils';

interface Props {
	UITheme: Theme;
	loading?: string;
}

export const ButtonContainer = styled.button`
	${(props: Props) => globalStyle(props.UITheme)}

	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	min-width: 12rem;
	height: var(--base-height);

	font-size: 1.5rem;
	font-weight: 500;

	border-radius: var(--border-radius);

	overflow: hidden;

	span {
		position: relative;
		z-index: 15;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.2rem;

		pointer-events: none;

		&.hidden {
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
		color: ${(props: Props) => readableColor(props.UITheme.colors.primary)};
		transition: 0.05s;

		.${classBase('ripple')} {
			background: ${(props: Props) =>
				transparentize(
					0.8,
					readableColor(props.UITheme.colors.primary)
				)};
		}

		${(props) => getDefaultVariantHover(props)}
	}

	&.${classBase('variant', 'text')} {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		.${classBase('ripple')} {
			background: ${(props: Props) =>
				transparentize(0.9, props.UITheme.colors.primary)};
		}

		${(props) => getTextVariantHover(props)}
	}

	&.${classBase('variant', 'secondary')} {
		background: ${(props) =>
			transparentize(0.975, props.UITheme.colors.primary)};
		color: ${(props) => H.readableColorByBackground(props)};
		transition: 0.1s;

		.${classBase('ripple')} {
			background: ${(props: Props) =>
				transparentize(0.92, props.UITheme.colors.primary)};
		}

		${(props) => getSecondaryVariantHover(props)}
	}

	&.${classBase('variant', 'outlined')} {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		border: var(--border-width-unfocused) solid var(--color-primary);

		.${classBase('ripple')} {
			background: ${(props: Props) =>
				transparentize(
					0.8,
					readableColor(props.UITheme.colors.primary)
				)};
		}

		${(props) => getOutlinedVariantHover(props)}
	}

	/* Sizes */
	&.${classBase('size', 'large')} {
		padding: 0 2.8rem;
	}
	&.${classBase('size', 'normal')} {
		padding: 0 2rem;
	}
	&.${classBase('size', 'small')} {
		padding: 0 1.6rem;
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
	if (props.loading) return css``;

	return css`
		&:hover {
			transform: scale(1.02);
		}
	`;
}

function getTextVariantHover(props: Props) {
	if (props.loading) return css``;

	return css`
		&:hover {
			background: ${(props: Props) =>
				transparentize(0.97, props.UITheme.colors.primary)};
		}
	`;
}

function getSecondaryVariantHover(props: Props) {
	if (props.loading) return css``;

	return css`
		&:hover {
			background: ${(props: Props) =>
				transparentize(0.96, props.UITheme.colors.primary)};
		}
	`;
}

function getOutlinedVariantHover(props: Props) {
	if (props.loading) return css``;

	return css`
		&:hover {
			border-color: transparent;
			background: var(--color-primary);
			color: #fff;
		}
	`;
}
