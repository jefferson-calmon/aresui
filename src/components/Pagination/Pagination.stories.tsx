import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './index';
import { defaultPropsPagination, PaginationProps } from './Pagination.types';

const storiesDefaultProps: PaginationProps = {
	pages: 7,
};

const meta: Meta<typeof Pagination> = {
	title: 'Pagination',
	component: Pagination,
	tags: ['autodocs'],
	args: {
		...defaultPropsPagination,
		...storiesDefaultProps,
	},
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
	args: {
		...defaultPropsPagination,
		...storiesDefaultProps,
	},
};
