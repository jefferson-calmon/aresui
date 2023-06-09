import React from 'react';

import Button from 'components/Button';
import { Theme } from 'contexts';
import { DeepPartial, Placement, Trigger } from 'types';
import { ChevronDown } from 'icons';

export interface DropdownProps {
	items: MenuItem[];

	menuSelector?: string;
	menuWidth?: '100%' | 'auto' | `${number}px`;
	placement: Placement;
	trigger: Trigger;

	theme: DeepPartial<Theme>;

	children: JSX.Element;
	customMenu?: (props: DropdownProps) => JSX.Element;

	onOpen?: () => void;
	onClose?: () => void;
	onToggle?: (open: boolean) => void;
    onChange?: (item: MenuItem) => void;
}

export interface MenuItem {
	id: string;
	content: string | JSX.Element;
	preventDefault?: boolean;
	onClick?: (item: MenuItem) => void;
	linkTo?: string;
}

export const defaultPropsDropdown: DropdownProps = {
	children: (
		<Button variant="secondary" size="small" rippleEffect>
			Dropdown <ChevronDown />
		</Button>
	),
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
	menuWidth: '220px',
	placement: 'bottom-left',
	trigger: 'click',
};
