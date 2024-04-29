import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './index';
import { PaginationProps } from './Pagination.types';

const storyProps: PaginationProps = {
	pages: 7,
};

const meta: Meta<typeof Pagination> = {
	title: 'Pagination',
	component: Pagination,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
