import type { Meta, StoryObj } from '@storybook/react';

import Link from './index';
import { defaultPropsLink } from './Link.types';

const meta: Meta<typeof Link> = {
	title: 'Link',
	component: Link,
	tags: ['autodocs'],
	args: {
		...defaultPropsLink,
	},
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	args: {
		...defaultPropsLink,
	},
};
