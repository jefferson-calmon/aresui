import React, { useEffect, useMemo, useRef } from 'react';

import InputMask from 'react-input-mask';
import { config, debounce, merge, useBoolean } from 'codekit';

import * as T from './Input.types';
import * as U from './Input.utils';
import * as C from './Input.components';
import Loading from 'components/Loading';
import Errors from 'components/Errors';
import { useControlledState } from 'hooks/useControlledState';
import { useError } from 'hooks/useError';
import { useTheme } from 'hooks/useTheme';
import { useComponentId } from 'hooks/useComponentId';
import { filterHTMLProps } from 'helpers/filterHTMLProps';
import { buildClassName } from 'helpers/buildClassName';

import { InputContainer } from './Input.styles';

config();

export function Input({
	name,
	type = 'text',
	label,
	placeholder,

	mode,
	role = 'default',
	mask,
	autoComplete,
	width = '100%',

	options = [],
	error: propError,
	addon,

	loading,
	disabled,

	errorPrefix = '',
	disableValidations,
	customErrors,
	money = {
		trigger: 'focus',
	},

	maskProps,
	loadingProps,

	onChangeValue,
	onChange,
	onInput,
	onFocus,
	onKeyUp,
	onBlur,
	children,
	...props
}: T.InputProps): JSX.Element {
	// Hooks
	const error = useError();
	const theme = useTheme(props.theme);
	const componentId = useComponentId('input');

	// Refs
	const inputRef = useRef<HTMLInputElement | null>(null);
	const renderedMoneyInput = useRef(false);

	// Controlled states
	const [value, setValue] = useControlledState(
		props.value,
		props.defaultValue ?? ''
	);

	// Boolean hooks
	const isFocused = useBoolean();
	const isAlreadyFocused = useBoolean();
	const isActivePickerOptions = useBoolean();

	// Memo vars
	const errors = useMemo(() => {
		const externalError = propError ? error.build(propError) : null;
		const renderExternalError = isAlreadyFocused.value && value;

		return [
			...error.errors,
			!!renderExternalError && externalError,
		].compact();
	}, [propError, error, isAlreadyFocused.value, value]);

	const isValid = useMemo(() => {
		return error.errors.length === 0 && errors.length === 0;
	}, [error.errors.length, errors.length]);

	const inputAttr = useMemo(() => {
		return U.getInputAttributes({
			mask,
			autoComplete,
			inputMode: mode,
			name,
			placeholder,
			role,
			type,
		});
	}, [autoComplete, mask, mode, name, placeholder, role, type]);

	const optionsFiltered = useMemo(() => {
		return options.search('value', String(value));
	}, [value, options]);

	const className = useMemo(() => {
		const classes = [
			U.classBase(),
			!isValid && U.classBase('invalid'),
			disabled && U.classBase('disabled'),
			isFocused.value && U.classBase('focused'),
		];

		return buildClassName(...classes);
	}, [isValid, disabled, isFocused.value]);

	// Effects
	useEffect(() => {
		const isMoney = role === 'currency';
		const isRenderTrigger = money?.trigger === 'render';
		const args = money?.args;

		const element = document.querySelector(`input#${componentId}`);
		const input = element as HTMLInputElement;

		if (
			!isMoney ||
			!isRenderTrigger ||
			!input ||
			renderedMoneyInput.current
		)
			return;

		U.maskInputMoneyByElement(input, args);
		input.blur();
		renderedMoneyInput.current = true;
	}, [componentId, money?.args, money?.trigger, role]);

	// Functions
	function handleChange(type: 'change' | 'input', isValid?: boolean) {
		if (!isValid && typeof isValid !== 'undefined') return () => null;

		const change = (event: React.ChangeEvent<HTMLInputElement>) => {
			onChange?.(event);

			isActivePickerOptions.setTrue();

			setValue(event.target.value);
			onChangeValue?.(event.target.value);
		};

		const input = (event: React.FormEvent<HTMLInputElement>) => {
			onInput?.(event);

			isActivePickerOptions.setTrue();

			const input = event.target as HTMLInputElement;

			setValue(input.value);
			onChangeValue?.(input.value);
		};

		if (type === 'input') return input;
		if (type === 'change') return change;

		return () => null;
	}

	function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		onKeyUp?.(event);
	}

	function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
		onFocus?.(event);
		isFocused.setTrue();
		isAlreadyFocused.setTrue();
		isActivePickerOptions.setTrue();

		if (role === 'currency' && money?.trigger === 'focus') {
			U.maskInputMoneyByEvent(event, money?.args);
		}
	}

	function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		onBlur?.(event);
		isFocused.setFalse();
		debounce(isActivePickerOptions.setFalse, 300);

		value && handleValidation(String(value));
	}

	function handleValidation(value: string) {
		if (disableValidations) return;

		const validator = U.getInputValidator(role);
		const isValid = validator(value);

		const errors = merge(U.validationErrors, customErrors ?? {});
		const errorMessage = errors[role];

		error.remove(errorMessage.slugify());

		if (!isValid) error.add(errorMessage);
	}

	function handleSelectPickerOption(option: T.InputPickerOption) {
		if (option.disabled) return;

		setValue(option.value);
		option.onClick?.();
		onChangeValue?.(option.value);
		isActivePickerOptions.setFalse();
	}

	// Common vars
	const Addon = addon;

	return (
		<InputContainer className={className} $theme={theme} $width={width}>
			{label && <label>{label}</label>}

			<div className={U.classBase('input-container')}>
				{loading && (
					<div className={U.classBase('input-addon')}>
						<Loading type="spinner" size={18} {...loadingProps} />
					</div>
				)}

				{Addon && (
					<div className={U.classBase('input-addon')}>
						<Addon />
					</div>
				)}

				<InputMask
					id={componentId}
					inputRef={inputRef}
					alwaysShowMask={false}
					maskChar={null} // If you want don't show the characters, just set `null`.;
					required
					// --
					aria-autocomplete={inputAttr['aria-autocomplete']}
					// --
					{...filterHTMLProps(props)}
					{...maskProps}
					// --
					type={inputAttr.type}
					inputMode={inputAttr.inputMode}
					mask={inputAttr.mask}
					autoComplete={inputAttr.autoComplete}
					placeholder={inputAttr.placeholder}
					name={inputAttr.name}
					value={role !== 'currency' ? (value as string) : undefined}
					// --
					onChange={handleChange('change', role !== 'currency')}
					onInput={handleChange('input', role === 'currency')}
					onKeyUp={handleKeyUp}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>

				{isActivePickerOptions.value && optionsFiltered.length > 0 && (
					<C.PickerOptions
						options={optionsFiltered}
						onChange={handleSelectPickerOption}
					/>
				)}
			</div>

			<Errors errors={errors} prefix={errorPrefix} />

			{children}
		</InputContainer>
	);
}

export * from './Input.types';

export default Input;
