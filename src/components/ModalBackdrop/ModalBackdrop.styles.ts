import styled from 'styled-components';

export const BackdropContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;

	width: 100%;
	height: 100%;

	background: rgba(0, 0, 0, 0.4);

	pointer-events: none;
`;
