import React, { useMemo } from 'react';

import { config } from 'codekit';

import * as T from './Errors.types';
import * as U from './Errors.utils';
import { useTheme } from 'hooks/useTheme';

import { ErrorsContainer } from './Errors.styles';

config();

export function Errors(props: T.ErrorsProps) {
	// Hooks
	const theme = useTheme(props.theme);

	// Memo vars
	const errors = useMemo(() => {
		return (props.errors ?? [])
			.map<T.ErrorItem>(U.errorItemMap)
			.uniqBy('id');
	}, [props.errors]);

	const className = useMemo(() => {
		const classes = [U.classBase()];

		return U.buildClassName(...classes);
	}, []);

	if (errors.length === 0) return null;

	return (
		<ErrorsContainer className={className} $theme={theme}>
			{errors.map((error) => (
				<span key={error.id} className={U.classBase('error')}>
					{props.prefix}
					{error.message}
				</span>
			))}
		</ErrorsContainer>
	);
}

export * from './Errors.types';

export default Errors;
