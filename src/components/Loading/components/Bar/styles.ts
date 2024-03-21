import styled from 'styled-components';

interface Props {
	$width: number;
	$height: number;
	$duration: number;
}

export const BarContainer = styled.div`
	--border-radius: 10px;
	--width: ${(props: Props) => props.$width + 'px'};
	--height: ${(props: Props) => props.$height + 'px'};
	--duration: ${(props: Props) => props.$duration + 's'};

	position: relative;

	width: var(--width);
	height: var(--height);

	border-radius: var(--border-radius);

	background: #ddd;

	.bar {
		position: absolute;
		top: 0;
		right: 100%;
		bottom: 0;
		left: 0;

		width: 0;
		height: 100%;

		border-radius: var(--border-radius);
		background: var(--color-primary);

		animation: borealisBar var(--duration) linear infinite;
	}

	@keyframes borealisBar {
		0% {
			left: 0%;
			right: 100%;
			width: 0%;
		}
		10% {
			left: 0%;
			right: 75%;
			width: 25%;
		}
		90% {
			right: 0%;
			left: 75%;
			width: 25%;
		}
		100% {
			left: 100%;
			right: 0%;
			width: 0%;
		}
	}
`;
