import React, { useMemo } from 'react';
import NextImage from 'next/image';

import { config } from 'codekit';

import * as T from './Image.types';
import * as U from './Image.utils';
import { useAresUI } from 'contexts';
import { buildClassName } from 'helpers/buildClassName';

config();

export const Image = ({ ...props }: T.ImageProps): JSX.Element => {
	// Hooks
	const { config } = useAresUI();

	// Memo vars
	const className = useMemo(() => {
		const classes = [U.classBase(), props.className];

		return buildClassName(...classes);
	}, [props.className]);

	const altText = useMemo(() => {
		const sentences = [props.alt, config.app.name].compact();

		return sentences.join(' - ');
	}, [config.app.name, props.alt]);

	return <NextImage {...props} className={className} alt={altText} />;
};

export * from './Image.types';

export default Image;
