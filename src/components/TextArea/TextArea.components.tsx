import React from 'react';

import { useError } from 'codekit';
import { TextAreaProps } from './TextArea.types';
import { classBase } from './TextArea.utils';

interface ErrorsProps {
	errors: ReturnType<typeof useError>['errors'];
	errorPrefix: TextAreaProps['errorPrefix'];
}

export function Errors(props: ErrorsProps) {
	if (props.errors.length === 0) return null;

	return (
		<div className={classBase('errors')}>
			{props.errors.map((error) => (
				<span key={error.id} className={classBase('error')}>
					{props.errorPrefix}
					{error.message}
				</span>
			))}
		</div>
	);
}
