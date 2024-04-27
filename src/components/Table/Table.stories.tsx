import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import Table from './index';
import Image from '../Image';
import { defaultPropsTable, TableProps } from './Table.types';

const data = Array.from({ length: 10 }).map(() => ({
	id: faker.string.uuid(),

	imageURL: faker.image.avatarLegacy(),
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.number(),
	address: faker.location.streetAddress(),

	createdAt: faker.date.recent().toISOString(),
}));

const storiesDefaultProps: Partial<TableProps<(typeof data)[number]>> = {
	data,
	columns: {
		imageURL: '',
		name: 'Nome',
		email: 'E-mail',
		phone: 'Telefone',
		createdAt: 'Criado em',
	},
	customColumns: {
		imageURL: (data) => (
			<Image
				src={data.imageURL}
				width={40}
				height={40}
				alt={data.name}
				style={{ borderRadius: 4 }}
			/>
		),
		createdAt: (data) => new Date(data.createdAt).toISOString(),
	},
	style: {
		columns: '40px auto auto auto auto',
	},
	options: [
		{
			content: 'Editar usuário',
			onClick: (data) => alert(`Usuário ${data.name} editado`),
		},
		{
			content: 'Apagar usuário',
			onClick: (data) => alert(`Usuário ${data.name} apagado`),
		},
	],
	sort: {
		name: 'Nome',
		email: 'E-mail',
		phone: 'Telefone',
		createdAt: 'Criado em',
	},
	pagination: {
		size: 4,
	},
};

const meta: Meta<typeof Table> = {
	title: 'Table',
	component: Table,
	tags: ['autodocs'],
	args: {
		...defaultPropsTable,
		...(storiesDefaultProps as unknown as typeof defaultPropsTable),
	},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	args: {
		...defaultPropsTable,
		...(storiesDefaultProps as unknown as typeof defaultPropsTable),
	},
};
