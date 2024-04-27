import styled from 'styled-components';

export const TableRowOptionsContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	width: 36px;
	height: 36px;

	border-radius: var(--aresui-table-border-radius);

	cursor: pointer;
	transition: 0.1s;

	svg {
		color: rgba(0, 0, 0, 0.7);
		font-weight: bold;
	}

	&:hover {
		background: rgba(0, 0, 0, 0.03);

		svg {
			color: #000;
		}
	}
`;
