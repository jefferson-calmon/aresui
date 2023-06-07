import type { Meta, StoryObj } from '@storybook/react';

import ExternalErrors from './index';
import { defaultPropsExternalErrors } from './ExternalErrors.types';

const meta: Meta<typeof ExternalErrors> = {
	title: 'ExternalErrors',
	component: ExternalErrors,
	tags: ['autodocs'],
	args: {
		...defaultPropsExternalErrors,
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
	},
};

export default meta;
type Story = StoryObj<typeof ExternalErrors>;

export const Default: Story = {
	args: {
		...defaultPropsExternalErrors,
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
	},
};
