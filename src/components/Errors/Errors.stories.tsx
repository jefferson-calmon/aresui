import type { Meta, StoryObj } from '@storybook/react';

import Errors, { ErrorsProps } from './index';

const storyProps: ErrorsProps = {
	errors: [
		{
			id: 'default',
			message: 'E-mail informado não é válido',
		},
		{
			id: 'default1',
			message: 'As senhas informadas não coincidem',
		},
	],
};

const meta: Meta<typeof Errors> = {
	title: 'Errors',
	component: Errors,
	tags: ['autodocs'],
	args: storyProps,
};

export default meta;
type Story = StoryObj<typeof Errors>;

export const Default: Story = {
	args: storyProps,
};
