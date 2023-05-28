import styled from 'styled-components';
import { lighten, readableColor, transparentize } from 'polished';

import { globalStyle } from 'styles/global/components';
import { Theme } from 'contexts';

interface Props {
	theme: Theme;
}

export const ButtonContainer = styled.button`
	${(props: Props) => globalStyle(props.theme)}

	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	min-width: 12rem;
	height: 4.4rem;
	padding: 0 2.8rem;

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

	.link {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;

		width: 100%;
		height: 100%;

		opacity: 0;
	}

	.ripple {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		pointer-events: none;
		z-index: 3;

		animation: ripple-animation 0.6s;
	}

	.loading-indicator {
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
	&.default {
		background: var(--color-primary);
		color: ${(props: Props) => readableColor(props.theme.colors.primary)};
		transition: 0.05s;

		.ripple {
			background: ${(props: Props) =>
				transparentize(0.8, readableColor(props.theme.colors.primary))};
		}

		&:hover {
			transform: scale(1.02);
		}
	}

	&.text {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		.ripple {
			background: ${(props: Props) =>
				lighten(0.9, props.theme.colors.primary)};
		}

		&:hover {
			background: ${(props: Props) =>
				lighten(0.98, props.theme.colors.primary)};
		}
	}

	&.outlined {
		background: transparent;
		color: var(--color-primary);
		transition: 0.1s;

		border: var(--border-width) solid var(--color-primary);

		.ripple {
			background: ${(props: Props) =>
				transparentize(0.8, readableColor(props.theme.colors.primary))};
		}

		&:hover {
			border-color: transparent;
			background: var(--color-primary);
			color: #fff;
		}
	}

	&.animating-ripple-effect {
		.ripple {
		}
	}

	/* Button states */
	&:disabled {
		cursor: not-allowed;
		pointer-events: visible;
		user-select: none;
		opacity: 0.3;
	}

	@keyframes ripple-animation {
		to {
			transform: scale(2);
			opacity: 0;
		}
	}
`;
