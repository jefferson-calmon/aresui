import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from './index';
import Button from 'components/Button';
import { defaultPropsTooltip, TooltipProps } from './Tooltip.types';

const storiesDefaultProps: TooltipProps = {
	role: 'button',
	label: 'Olá, eu sou um tooltip!',
	position: 'top',
	children: <Button variant="secondary">Passe o mouse</Button>,
};

const meta: Meta<typeof Tooltip> = {
	title: 'Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	args: {
		...defaultPropsTooltip,
		...storiesDefaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
	args: {
		...defaultPropsTooltip,
		...storiesDefaultProps,
	},
};
