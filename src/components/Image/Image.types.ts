import { ImageProps as NextImageProps } from 'next/image';

import ImageLogo from 'assets/logos/logo-example.png';

export type ImageProps = NextImageProps;

export const defaultPropsImage: ImageProps = {
	src: ImageLogo,
	alt: 'AresUI Image Component',
	width: 180,
	height: 180,
	blurDataURL: ImageLogo.src,
};
