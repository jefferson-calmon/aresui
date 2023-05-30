import React, { useState, useMemo, useRef } from 'react';

import { debounce, mergeObjects, useBoolean } from 'pandora-tools';
import InputMask from 'react-input-mask';

import * as T from './Input.types';
import * as U from './Input.utils';
import * as C from './Input.components';
import { useAresUI } from 'contexts';
import { useError } from 'hooks/useError';
import { buildClassName } from 'helpers/buildClassName';

import { InputContainer } from './Input.styles';
import Loading from 'components/Loading';
import { searchInText } from 'helpers/searchInText';

export function Input(props: T.InputProps): JSX.Element {
	// Hooks
	const error = useError();
	const aresUI = useAresUI();

	// Refs
	const inputRef = useRef<HTMLInputElement | null>(null);

	// States
	const [value, setValue] = useState<string>('');

	// Boolean hooks
	const isFocused = useBoolean();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [props.theme]);

	const isValid = useMemo(() => {
		return error.errors.length === 0;
	}, [error.errors]);

	const inputMask = useMemo(() => {
		return props.mask || '';
	}, [props.mask]);

	const inputName = useMemo(() => {
		return props.name;
	}, [props.name]);

	const inputType = useMemo(() => {
		return props.type || U.getInputType(props.role);
	}, [props.role]);

	const inputMode = useMemo(() => {
		return props.inputMode || U.getInputMode(props.role);
	}, [props.role]);

	const inputPlaceholder = useMemo(() => {
		return props.placeholder || U.getInputPlaceholder(props.role);
	}, [props.role]);

	const inputAutoComplete = useMemo(() => {
		return props.autoComplete || U.getInputAutoComplete(props.role);
	}, [props.role]);

	const pickerOptions = useMemo(() => {
		return props.pickerOptions.filter((option) =>
			searchInText(value, option.value)
		);
	}, [value, props.pickerOptions]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			U.classBase(props.containerClassName || ''),
			!isValid && U.classBase('invalid'),
			props.disabled && U.classBase('disabled'),
			isFocused.value && U.classBase('focused'),
		];

		return buildClassName(...classes);
	}, [props, isValid, isFocused.value]);

	// Functions
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.onChange?.(event);

		setValue(event.target.value);
	}

	function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		props.onKeyUp?.(event);
	}

	function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
		props.onFocus?.(event);
		isFocused.setTrue();

		if (props.role === 'money') U.moneyMask(event, props.moneyArgs);
	}

	function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		props.onBlur?.(event);
		debounce(isFocused.setFalse, 50);

		value && handleValidation(value);
	}

	function handleValidation(value: string) {
		if (props.disableValidations) return;

		const validator = U.getInputValidator(props.role);
		const isValid = validator(value);

		const errors = mergeObjects(U.validationErrors, props.customErrors);
		const errorMessage = errors[props.role];

		error.remove(errorMessage.slugify());

		if (!isValid) error.add(errorMessage);
	}

	function handleSelectPickerOption(option: T.InputPickerOption) {
        if (option.disabled) return;

		const input = document.querySelector<HTMLInputElement>('input');

		if (input) input.value = option.value;

		setValue(option.value);
	}

	return (
		<InputContainer className={className} theme={theme} width={props.width}>
			{props.label && <label>{props.label}</label>}

			<div className={U.classBase('input-container')}>
				{props.loading && (
					<div className={U.classBase('input-addon')}>
						<Loading size={18} {...props.loadingProps} />
					</div>
				)}

				{props.addon && (
					<div className={U.classBase('input-addon')}>
						<props.addon />
					</div>
				)}

				<InputMask
					alwaysShowMask={false}
					maskChar={null} // If you want don't show the characters, just set `null`.;
					required
					{...props}
					{...props.maskProps}
					inputRef={inputRef}
					type={inputType}
					inputMode={inputMode}
					mask={inputMask}
					autoComplete={inputAutoComplete}
					placeholder={inputPlaceholder}
					name={inputName}
					onChange={handleChange}
					onKeyUp={handleKeyUp}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>

				{isFocused.value && (
					<C.PickerOptions
						options={pickerOptions}
						onChange={handleSelectPickerOption}
					/>
				)}
			</div>

			<C.Errors errors={error.errors} errorPrefix={props.errorPrefix} />

			{props.children}
		</InputContainer>
	);
}

Input.defaultProps = T.defaultPropsInput;

export * from './Input.types';

export default Input;
