import type { Meta, StoryObj } from '@storybook/react';

import Image, { ImageProps } from './index';

import ImageLogo from 'assets/logos/logo-example.png';

const storyProps: ImageProps = {
	src: ImageLogo,
	alt: 'AresUI Image Component',
	width: 180,
	height: 180,
	blurDataURL: ImageLogo.src,
};

const meta: Meta<typeof Image> = {
	title: 'Image',
	component: Image,
	tags: ['autodocs'],
	args: {
		...storyProps,
	},
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
	args: {
		...storyProps,
	},
};
