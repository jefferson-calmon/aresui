import styled from 'styled-components';

export const DropzoneContainer = styled.div`
	position: relative;

	input {
		position: absolute;
		right: 0;
		bottom: 0;
		pointer-events: none;
		user-select: none;
		opacity: 0;
		visibility: hidden;
	}

	.dropzone-active-drop {
		position: absolute;
		top: 0;
		left: 0;

		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;

		width: 100%;
		height: 100%;
	}
`;

export default DropzoneContainer;
