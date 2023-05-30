import React from 'react';

import { useError } from 'pandora-tools';
import { InputPickerOption, InputProps } from './Input.types';
import { classBase } from './Input.utils';

interface ErrorsProps {
	errors: ReturnType<typeof useError>['errors'];
	errorPrefix: InputProps['errorPrefix'];
}

interface PickerOptionsProps {
	onChange: (option: InputPickerOption) => void;
	options: InputPickerOption[];
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

export function PickerOptions(props: PickerOptionsProps) {
	return (
		<div className={classBase('picker-options')}>
			{props.options.map((option) => (
				<div
					key={option.value}
					className={`
                        ${classBase('picker-option')}
                        ${option.disabled ? 'disabled' : ''}
                    `}
					onClick={() => props.onChange(option)}
				>
					{option.value}
				</div>
			))}

			{props.options.length === 0 && (
				<div className={`${classBase('picker-option')} not-found`}>
					Não encontrado
				</div>
			)}
		</div>
	);
}
