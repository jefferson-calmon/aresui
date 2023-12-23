import React, { useEffect, useMemo, useRef } from 'react';

import InputMask from 'react-input-mask';
import { debounce, mergeObjects, randomString, useBoolean } from 'codekit';

import * as T from './Input.types';
import * as U from './Input.utils';
import * as C from './Input.components';
import Loading from 'components/Loading';
import { useControlledState } from 'hooks/useControlledState';
import { useError } from 'hooks/useError';
import { useAresUI } from 'contexts';
import { buildClassName } from 'helpers/buildClassName';
import { searchInText } from 'helpers/searchInText';

import { InputContainer } from './Input.styles';

export function Input(props: T.InputProps): JSX.Element {
	// Hooks
	const error = useError();
	const aresUI = useAresUI();

	// Refs
	const inputRef = useRef<HTMLInputElement | null>(null);
	const renderedMoneyInput = useRef(false);

	// Controlled states
	const [value, setValue] = useControlledState(
		props.value,
		props.defaultValue || ''
	);

	// Boolean hooks
	const isFocused = useBoolean();
	const isAlreadyFocused = useBoolean();

	// Memo vars
	const theme = useMemo(() => {
		return mergeObjects(aresUI.theme, props.theme);
	}, [aresUI.theme, props.theme]);

	const errors = useMemo(() => {
		const externalError = props.error ? error.build(props.error) : null;
		const renderExternalError = isAlreadyFocused.value && value;

		return [
			...error.errors,
			!!renderExternalError && externalError,
		].compact();
	}, [props.error, error, isAlreadyFocused.value, value]);

	const isValid = useMemo(() => {
		return error.errors.length === 0 && errors.length === 0;
	}, [error.errors.length, errors.length]);

	const inputAttr = useMemo(() => {
		return U.getInputAttributes(props);
	}, [props]);

	const inputId = useMemo(() => randomString(16), []);

	const pickerOptions = useMemo(() => {
		return props.pickerOptions.filter((option) =>
			searchInText(String(value), option.value)
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

	// Effects
	useEffect(() => {
		const isMoney = props.role === 'money';
		const isRenderTrigger = props.money?.trigger === 'render';
		const args = props.money?.args;

		const element = document.querySelector(`input#${inputId}`);
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
	}, [inputId, props.money?.args, props.money?.trigger, props.role]);

	// Functions
	function handleChange(type: 'change' | 'input', isValid?: boolean) {
		if (!isValid && typeof isValid !== 'undefined') return () => null;

		const change = (event: React.ChangeEvent<HTMLInputElement>) => {
			props.onChange?.(event);

			setValue(event.target.value);
			props.onChangeValue?.(event.target.value);
		};

		const input = (event: React.FormEvent<HTMLInputElement>) => {
			props.onInput?.(event);

			const input = event.target as HTMLInputElement;

			setValue(input.value);
			props.onChangeValue?.(input.value);
		};

		if (type === 'input') return input;
		if (type === 'change') return change;

		return () => null;
	}

	function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		props.onKeyUp?.(event);
	}

	function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
		props.onFocus?.(event);
		isFocused.setTrue();
		isAlreadyFocused.setTrue();

		if (props.role === 'money' && props.money?.trigger === 'focus') {
			U.maskInputMoneyByEvent(event, props.money?.args);
		}
	}

	function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
		props.onBlur?.(event);
		debounce(isFocused.setFalse, 50);

		value && handleValidation(String(value));
	}

	function handleValidation(value: string) {
		if (props.disableValidations) return;

		const validator = U.getInputValidator(props.role);
		const isValid = validator(value);

		const errors = mergeObjects(
			U.validationErrors,
			props.customErrors ?? {}
		);
		const errorMessage = errors[props.role];

		error.remove(errorMessage.slugify());

		if (!isValid) error.add(errorMessage);
	}

	function handleSelectPickerOption(option: T.InputPickerOption) {
		if (option.disabled) return;

		setValue(option.value);
	}

	return (
		<InputContainer
			className={className}
			UITheme={theme}
			width={props.width}
		>
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
					id={inputId}
					inputRef={inputRef}
					alwaysShowMask={false}
					maskChar={null} // If you want don't show the characters, just set `null`.;
					required
					// --
					aria-autocomplete={inputAttr['aria-autocomplete']}
					// --
					{...U.filterProps(props)}
					{...props.maskProps}
					// --
					type={inputAttr.type}
					inputMode={inputAttr.inputMode}
					mask={inputAttr.mask}
					autoComplete={inputAttr.autoComplete}
					placeholder={inputAttr.placeholder}
					name={inputAttr.name}
					// value={value as string}
					// --
					onChange={handleChange('change', props.role !== 'money')}
					onInput={handleChange('input', props.role === 'money')}
					onKeyUp={handleKeyUp}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>

				{isFocused.value && props.pickerOptions.length > 0 && (
					<C.PickerOptions
						options={pickerOptions}
						onChange={handleSelectPickerOption}
					/>
				)}
			</div>

			<C.Errors errors={errors} errorPrefix={props.errorPrefix} />

			{props.children}
		</InputContainer>
	);
}

Input.defaultProps = T.defaultPropsInput;

export * from './Input.types';

export default Input;
