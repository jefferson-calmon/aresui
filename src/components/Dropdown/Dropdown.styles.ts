import styled, { StyledComponent } from 'styled-components';

import * as H from 'helpers/styled';
import { classBase } from './Dropdown.utils';
import { Theme } from 'contexts';
import { globalStyle } from 'styles/global/components';

interface Props {
	width: string;
	UITheme: Theme;
}

type Styled = StyledComponent<'div', any, Props, never>;

export const DropdownContainer = styled.div`
	position: relative;

	cursor: pointer;

	width: fit-content;

	.${classBase('children')} {
		position: relative;
	}
`;

export const DropdownMenuContainer: Styled = styled.div`
	${(props: Props) => globalStyle(props.UITheme)}

	position: absolute;
	z-index: 100;

	display: flex;
	flex-direction: column;

	min-width: ${(props: Props) => props.width};
	width: fit-content;
	padding: 0.4em 0;

	background: #fff;
	border: 1px solid var(--color-line);
	border-radius: var(--border-radius);
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.06);
	/* box-shadow: var(--shadow-extra-small); */

	cursor: pointer;

	.${classBase('item')} {
		display: inline-flex;
		align-items: center;

		text-align: left !important;
        white-space: nowrap;

		padding: 0.8em 1.2em;

		font-size: 1.4em;

		opacity: 0.8;
		cursor: pointer;

		&:hover {
			opacity: 1;
			color: var(--color-primary);
			background: ${H.transparentizePrimaryColorBy97Percent};
		}
	}

	/* Placements */
	& {
		--gap: 0.8em;

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
` as Styled;

export default DropdownContainer;
