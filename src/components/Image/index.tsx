import React, { useMemo } from 'react';
import NextImage from 'next/image';

import { config } from 'pandora-tools';

import * as T from './Image.types';
import * as U from './Image.utils';
import { useAresUI } from 'contexts';
import { buildClassName } from 'helpers/buildClassName';

config();

export const Image = (props: T.ImageProps): JSX.Element => {
	// Hooks
	const aresUI = useAresUI();

	// Memo vars
	const className = useMemo(() => {
		const classes = [U.classBase(), U.classBase(props.className || '')];

		return buildClassName(...classes);
	}, [props.className]);

	const altText = useMemo(() => {
		const sentences = [props.alt, aresUI.config.app.name].compact();

		return sentences.join(' | ');
	}, []);

	return <NextImage className={className} {...props} alt={altText} />;
};

export default Image;
