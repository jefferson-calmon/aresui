import React from 'react';

import { BasePropsWithoutComponentProps, Placement, Trigger } from 'types';
import { Theme } from 'contexts';

export type AutoCloseListeners = 'scroll' | 'resize';
export type MenuProps = Pick<
	Required<DropdownProps>,
	'items' | 'height' | 'width' | 'placement' | 'searchable'
> & {
	theme: Theme;
	onChange?: DropdownProps['onChange'];
};

export interface DropdownProps extends BasePropsWithoutComponentProps {
	items: (DropdownMenuItem | (() => JSX.Element))[];

	width?: '100%' | 'auto' | `${number}px`;
	height?: '100%' | 'auto' | `${number}px`;

	placement?: Placement;
	trigger?: Trigger;
	searchable?: boolean;

	autoCloseListeners?: AutoCloseListeners[];
	disableAutoCloseWhenClosest?: string[];

	customMenu?: (props: MenuProps) => JSX.Element;

	onOpen?: () => void;
	onClose?: () => void;
	onToggle?: (open: boolean) => void;
	onChange?: (item: DropdownMenuItem) => void;

	children: JSX.Element | React.ReactNode;
}

export interface DropdownMenuItem {
	id: string;
	content: string | JSX.Element;
	preventDefault?: boolean;
	onClick?: (item: DropdownMenuItem) => void;
	linkTo?: string;
}
