import React from 'react';

import { InputPickerOption } from './Input.types';
import { classBase } from './Input.utils';

interface PickerOptionsProps {
	onChange: (option: InputPickerOption) => void;
	options: InputPickerOption[];
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
                    title={option.value}
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
