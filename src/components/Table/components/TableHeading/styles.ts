import styled from 'styled-components';

export const TableHeadingContainer = styled.div`
	--table-heading-handler-item-height: 46px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	margin-bottom: 40px;

	> h2 {
		font-size: 22px;
	}

	.search {
		display: flex;
		align-items: center;

		width: 100%;
		max-width: 360px;
		height: var(--aresui-table-handler-height);

		background: var(--aresui-table-handler-background);
		border: 1px solid var(--aresui-table-handler-border-color);
		border-radius: var(--aresui-table-border-radius);

		.search-icon {
			display: flex;
			align-items: center;
			justify-content: center;

			width: 46px;
			height: var(--aresui-table-handler-height);

			opacity: 0.5;

			svg {
				width: 20px;
				height: 20px;
			}
		}

		input {
			all: unset;

			height: 100%;
			width: 100%;

			font-size: 14px;
			font-weight: 500;

			color: #000;

			&::placeholder {
				font-weight: 400;
				color: rgba(0, 0, 0, 0.75);
				opacity: 0.5;
			}
		}
	}

	.handlers {
		display: flex;
		align-items: center;
		gap: 12px;

		.handler {
			position: relative;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 12px;

			height: var(--aresui-table-handler-height);
			padding: 0 12px;

			font-size: 14px;

			background: var(--aresui-table-handler-background);
			border: 1px solid var(--aresui-table-handler-border-color);
			border-radius: var(--aresui-table-border-radius);

			cursor: pointer;

			svg {
				width: 18px;
				height: 18px;
			}
		}
	}
`;
