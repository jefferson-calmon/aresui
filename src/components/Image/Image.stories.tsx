import type { Meta, StoryObj } from '@storybook/react';

import Image from './index';
import { defaultPropsImage } from './Image.types';

const meta: Meta<typeof Image> = {
	title: 'Image',
	component: Image,
	tags: ['autodocs'],
	args: {
		...defaultPropsImage,
	},
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
	args: {
		...defaultPropsImage,
	},
};
