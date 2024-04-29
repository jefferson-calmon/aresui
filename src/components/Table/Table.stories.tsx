import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker/locale/pt_BR';

import Table from './index';
import Image from '../Image';
import { TableProps } from './Table.types';

type Data = (typeof data)[number];

const data = Array.from({ length: 10 }).map(() => ({
	id: faker.string.uuid(),

	imageURL: faker.image.avatarLegacy(),
	name: faker.person.fullName(),
	email: faker.internet.email(),
	phone: faker.phone.number(),
	address: faker.location.streetAddress(),

	createdAt: faker.date.recent().toISOString(),
}));

const storyProps: Partial<TableProps<Data>> = {
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

const meta: Meta<typeof Table<Data>> = {
	title: 'Table',
	component: Table,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof Table<Data>>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
