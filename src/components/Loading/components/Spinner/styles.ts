import styled from 'styled-components';

import { classBase } from '../../Loading.utils';

interface Props {
	$size: number;
	$duration: number;
}

export const SpinnerContainer = styled.div`
	position: relative;

	--size: ${(props: Props) => props.$size + 'px'};
	--duration: ${(props: Props) => props.$duration + 'ms'};

	width: var(--size);
	height: var(--size);

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

		animation: rotate var(--duration) linear infinite;

		.${classBase('spinner-path')} {
			stroke-linecap: round;
			animation: dash var(--duration) ease-in-out infinite;
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
