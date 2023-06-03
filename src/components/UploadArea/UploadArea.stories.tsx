import type { Meta, StoryObj } from '@storybook/react';

import UploadArea from './index';
import { defaultPropsUploadArea } from './UploadArea.types';

const meta: Meta<typeof UploadArea> = {
	title: 'UploadArea',
	component: UploadArea,
	tags: ['autodocs'],
	args: {
		...defaultPropsUploadArea,
	},
};

export default meta;
type Story = StoryObj<typeof UploadArea>;

export const Default: Story = {
	args: {
		...defaultPropsUploadArea,
	},
};
