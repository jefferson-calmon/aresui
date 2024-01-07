/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';
import { classBase } from './Loading.utils';

interface Props {
	UITheme: Theme;
	size: number;
	speedInSeconds: number;
}

export const LoadingContainer = styled.div`
	${(props: Props) => globalStyle(props.UITheme)}

	position: relative;

	width: ${(props: Props) => props.size / 16}rem;
	height: ${(props: Props) => props.size / 16}rem;

	svg,
	> div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;

		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;
		object-fit: contain;

		animation: rotate 2s linear infinite;

		.${classBase('path-spinner')} {
			stroke-linecap: round;
			animation: dash ${({ speedInSeconds }) => speedInSeconds}s
				ease-in-out infinite;
		}
	}

	@keyframes rotate {
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dasharray: 1, 150;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -35;
		}
		100% {
			stroke-dasharray: 90, 150;
			stroke-dashoffset: -124;
		}
	}
`;

export default LoadingContainer;
