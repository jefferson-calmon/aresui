import React, { useMemo } from 'react';

import { mergeObjects } from 'codekit';

import * as T from './ExternalErrors.types';
import * as U from './ExternalErrors.utils';
import { useAresUI } from 'contexts';

import { ExternalErrorsContainer } from './ExternalErrors.styles';

export function ExternalErrors(props: T.ExternalErrorsProps) {
	// Hooks
	const aresUI = useAresUI();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [props.theme]);

	const className = useMemo(() => {
		const classes = [U.classBase()];

		return U.buildClassName(...classes);
	}, [props]);

	if (props.errors.length === 0) return null;

	return (
		<ExternalErrorsContainer className={className} theme={theme}>
			{props.errors.map((error) => (
				<span key={error.id} className={U.classBase('error')}>
					{props.prefix}
					{error.message}
				</span>
			))}
		</ExternalErrorsContainer>
	);
}

ExternalErrors.defaultProps = T.defaultPropsExternalErrors;

export * from './ExternalErrors.types';

export default ExternalErrors;
