import type { Meta, StoryObj } from '@storybook/react';

import UploadArea from './index';

const meta: Meta<typeof UploadArea> = {
	title: 'UploadArea',
	component: UploadArea,
	tags: ['autodocs'],
	args: {},
};

export default meta;
type Story = StoryObj<typeof UploadArea>;

export const Default: Story = {
	args: {},
};
