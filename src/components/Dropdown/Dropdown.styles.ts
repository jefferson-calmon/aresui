/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

import * as H from 'helpers/styled';
import { classBase } from './Dropdown.utils';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';

interface Props {
	$width: string;
	$height: string;
	$theme: Theme;
}
export const DropdownContainer = styled.div`
	position: relative;

	cursor: pointer;

	width: fit-content;

	.${classBase('children')} {
		position: relative;
	}
`;

export const DropdownMenuContainer = styled.div`
	${(props: Props) => globalStyle(props.$theme)}

	position: absolute;
	z-index: 100;

	display: flex;
	flex-direction: column;

	min-width: ${(props: Props) => props.$width};
	max-height: ${(props: Props) => props.$height};
	width: fit-content;
	height: fit-content;
	padding: 4px 4px;

	background: var(--color-background);
	border: 1px solid var(--color-line);
	border-radius: var(--border-radius);
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
	/* box-shadow: var(--shadow-extra-small); */

	cursor: pointer;

	overflow-y: scroll;

	.search {
		input {
			height: 36px;
			width: 100%;
			padding: 0 12px;

			border: 1px solid var(--color-line);
			border-radius: 5px;

			color: #000;
			opacity: 1;
			font-weight: 500;

			&::placeholder {
				font-weight: 400;
			}

			&:hover {
				border-color: ${H.transparentize('primary', 0.7)};
				transition: 0.1s;
			}
		}
	}

	.${classBase('item')} {
		display: inline-flex;
		align-items: center;

		text-align: left !important;
		white-space: nowrap;

		padding: 8px 12px;

		font-size: 14px;

		opacity: 0.8;
		cursor: pointer;

		border-radius: 4px;

		&:not(.search):hover {
			opacity: 1;
			color: var(--color-primary);
			background: ${H.transparentize('primary', 0.97)};
		}
	}

	/* Placements */
	& {
		--gap: 8px;

		&.${classBase('placement', 'top-start')} {
			top: 0;
			left: 0;
			transform: translate(-100%, -100%);
		}

		&.${classBase('placement', 'top-left')} {
			top: calc(-0% - var(--gap));
			left: 0;
			transform: translate(0, -100%);
		}

		&.${classBase('placement', 'top-center')} {
			top: calc(-0% - var(--gap));
			left: 50%;
			transform: translateX(-50%) translateY(-100%);
		}

		&.${classBase('placement', 'top-right')} {
			top: calc(-0% - var(--gap));
			right: 0;
			transform: translate(0, -100%);
		}

		&.${classBase('placement', 'top-end')} {
			top: 0;
			right: 0;
			transform: translateX(100%) translateY(-100%);
		}

		&.${classBase('placement', 'right-start')} {
			top: 0;
			right: 0;
			transform: translate(100%, -100%);
		}

		&.${classBase('placement', 'right-top')} {
			top: 0;
			right: calc(0% - var(--gap));
			transform: translate(100%, 0);
		}

		&.${classBase('placement', 'right-center')} {
			top: 50%;
			right: calc(0% - var(--gap));
			transform: translate(100%, -50%);
		}

		&.${classBase('placement', 'right-bottom')} {
			bottom: 0;
			right: calc(0% - var(--gap));
			transform: translate(100%, 0);
		}

		&.${classBase('placement', 'right-end')} {
			bottom: 0;
			right: 0;
			transform: translate(100%, 100%);
		}

		&.${classBase('placement', 'bottom-start')} {
			bottom: 0;
			left: 0;
			transform: translate(-100%, 100%);
		}

		&.${classBase('placement', 'bottom-left')} {
			bottom: calc(0% - var(--gap));
			left: 0;
			transform: translate(0, 100%);
		}

		&.${classBase('placement', 'bottom-center')} {
			bottom: calc(-0% - var(--gap));
			left: 50%;
			transform: translateX(-50%) translateY(100%);
		}

		&.${classBase('placement', 'bottom-right')} {
			bottom: calc(-0% - var(--gap));
			right: 0;
			transform: translate(0, 100%);
		}

		&.${classBase('placement', 'bottom-end')} {
			bottom: 0;
			right: 0;
			transform: translateX(100%) translateY(100%);
		}

		&.${classBase('placement', 'left-start')} {
			top: 0;
			left: 0;
			transform: translate(-100%, -100%);
		}

		&.${classBase('placement', 'left-top')} {
			top: 0;
			left: calc(-0% - var(--gap));
			transform: translate(-100%, 0);
		}

		&.${classBase('placement', 'left-center')} {
			top: 50%;
			left: calc(-0% - var(--gap));
			transform: translate(-100%, -50%);
		}

		&.${classBase('placement', 'left-bottom')} {
			bottom: 0;
			left: calc(-0% - var(--gap));
			transform: translate(-100%, 0);
		}

		&.${classBase('placement', 'left-end')} {
			bottom: 0;
			left: 0;
			transform: translate(-100%, 100%);
		}
	}
`;

export const Div = styled.div``;

export default DropdownContainer;
