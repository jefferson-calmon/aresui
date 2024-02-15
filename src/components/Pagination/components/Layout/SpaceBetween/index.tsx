import React, { useMemo } from 'react';

import { classBase } from 'components/Pagination/Pagination.utils';
import { buildClassName } from 'helpers/buildClassName';

import { SpaceBetweenContainer } from './styles';

function SpaceBetween() {
	// Memo vars
	const className = useMemo(() => {
		const classes = [classBase('space')];

		return buildClassName(...classes);
	}, []);

	return <SpaceBetweenContainer className={className} />;
}

export default SpaceBetween;
