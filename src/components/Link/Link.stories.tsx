import type { Meta, StoryObj } from '@storybook/react';

import Link from './index';
import { defaultProps } from './Link.types';

const meta: Meta<typeof Link> = {
	title: 'Link',
	component: Link,
	tags: ['autodocs'],
	args: {
		...defaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	args: {
		...defaultProps,
	},
};
