import React from 'react';

import Button from 'components/Button';
import { Theme } from 'contexts';
import { DeepPartial, Placement, Trigger } from 'types';
import { ChevronDown } from 'icons';

export type AutoCloseListeners = 'scroll' | 'resize';

export interface DropdownProps {
	items: DropdownMenuItem[];

	menuSelector?: string;
	width?: '100%' | 'auto' | `${number}px`;
	height?: '100%' | 'auto' | `${number}px`;

	placement: Placement;
	trigger: Trigger;
    searchable?: boolean;

	autoCloseListeners: AutoCloseListeners[];

	theme: DeepPartial<Theme>;

	children: JSX.Element;
	customMenu?: (props: DropdownProps) => JSX.Element;

	onOpen?: () => void;
	onClose?: () => void;
	onToggle?: (open: boolean) => void;
	onChange?: (item: DropdownMenuItem) => void;
}

export interface DropdownMenuItem {
	id: string;
	content: string | JSX.Element;
	preventDefault?: boolean;
	onClick?: (item: DropdownMenuItem) => void;
	linkTo?: string;
}

export interface DropdownMenuItemProps {
	item: DropdownMenuItem;
	onClick: (item: DropdownMenuItem) => (event: React.MouseEvent) => void;
}

export const defaultPropsDropdown: DropdownProps = {
	children: (
		<Button variant="secondary" size="small" rippleEffect>
			Dropdown <ChevronDown />
		</Button>
	),
	autoCloseListeners: ['resize', 'scroll'],
	items: [
		{
			id: 'item1',
			content: 'New File',
		},
		{
			id: 'item2',
			content: 'New File with Current Profile',
		},
		{
			id: 'item3',
			content: 'Download As...',
		},
		{
			id: 'item4',
			content: 'Export PDF',
		},
		{
			id: 'item5',
			content: 'Export HTML',
		},
		{
			id: 'item6',
			content: 'Settings',
		},
	],
	theme: {},
	width: '220px',
	height: '200px',
	placement: 'bottom-left',
	trigger: 'click',
};
