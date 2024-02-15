import React, { useEffect, useMemo, useState } from 'react';

import { mergeObjects, uuid } from 'codekit';

import * as T from './Checkbox.types';
import * as U from './Checkbox.utils';
import { useAresUI } from 'contexts';
import { buildClassName } from 'helpers/buildClassName';
import { CheckIcon } from 'icons';

import { CheckboxContainer } from './Checkbox.styles';

export function Checkbox(props: T.CheckboxProps): JSX.Element {
	// Hooks
	const aresUI = useAresUI();

	// States
	const [checked, setChecked] = useState<boolean>();

	// Memo Vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			props.disabled && U.classBase('disabled'),
			checked && U.classBase('checked'),
		];

		return buildClassName(...classes);
	}, [props, checked]);

	const checkboxId = useMemo(() => {
		return 'checkbox_id:' + uuid();
	}, []);

	// Effects
	useEffect(() => {
		const initialChecked = props.checked || props.defaultChecked || false;

		if (props.disabled) return;

		setChecked(initialChecked);
	}, [props.checked, props.defaultChecked, props.disabled]);

	// Functions
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.onChange?.(event.target.checked, event);

		if (props.disabled || typeof props.checked !== 'undefined') return;

		setChecked(event.target.checked);
	}

	function handleClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
		e.stopPropagation();

		props.onClick?.(e);
	}

	return (
		<CheckboxContainer
			className={className}
			$theme={theme}
			$size={props.size}
		>
			<label>
				<div className={U.classBase('wrapper')}>
					<input
						type="checkbox"
						id={checkboxId}
						checked={checked}
						aria-checked={checked}
						{...props}
						name={props.name}
						onChange={handleChange}
						onClick={handleClick}
					/>

					{checked && <CheckIcon />}
				</div>

				{props.label && (
					<span className={U.classBase('label')}>
						{typeof props.label === 'string' ? (
							props.label
						) : (
							<props.label />
						)}
					</span>
				)}
			</label>
		</CheckboxContainer>
	);
}

Checkbox.defaultProps = T.defaultPropsCheckbox;

export * from './Checkbox.types';

export default Checkbox;
