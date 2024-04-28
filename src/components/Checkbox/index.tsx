import React, { useMemo } from 'react';

import { useControlledState } from 'codekit';

import * as T from './Checkbox.types';
import * as U from './Checkbox.utils';
import { buildClassName } from 'helpers/buildClassName';
import { CheckIcon } from 'icons';
import { useTheme } from 'hooks/useTheme';
import { useComponentId } from 'hooks/useComponentId';

import { CheckboxContainer } from './Checkbox.styles';

export function Checkbox({
	label = 'Checkbox',
	size = 16,
	disabled,
	checked,
	onChange,
	...props
}: T.CheckboxProps): JSX.Element {
	// Hooks
	const theme = useTheme(props.theme);
	const componentId = useComponentId('checkbox');

	// States
	const [isChecked, setIsChecked] = useControlledState<boolean | undefined>(
		checked,
		false
	);

	// Memo Vars
	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			disabled && U.classBase('disabled'),
			isChecked && U.classBase('checked'),
		];

		return buildClassName(...classes);
	}, [disabled, isChecked]);

	// Functions
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (disabled) return;

		onChange?.(event.target.checked, event);
		setIsChecked(event.target.checked);
	}

	function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
		e.stopPropagation();

		props.onClick?.(e);
	}

	// Common vars
	const Label = label;

	return (
		<CheckboxContainer className={className} $theme={theme} $size={size}>
			<label>
				<div className={U.classBase('wrapper')}>
					<input
						type="checkbox"
						id={componentId}
						checked={!!isChecked}
						aria-checked={!!isChecked}
						{...props}
						onChange={handleChange}
						onClick={handleClick}
					/>

					{isChecked && <CheckIcon />}
				</div>

				{Label && (
					<span className={U.classBase('label')}>
						{typeof Label === 'string' ? Label : <Label />}
					</span>
				)}
			</label>
		</CheckboxContainer>
	);
}

export * from './Checkbox.types';

export default Checkbox;
